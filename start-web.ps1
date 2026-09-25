[CmdletBinding()]
param(
    [int]$Port = 8000,
    [string]$Results = "results",
    [string]$Profile = "full",
    [string]$Device = "auto",
    [int]$SchedulerJobs = 1,
    [switch]$Docker,
    [switch]$NoBrowser
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Root

if ($Port -lt 1 -or $Port -gt 65535) {
    throw "Port must be between 1 and 65535."
}
if ($SchedulerJobs -lt 1) {
    throw "SchedulerJobs must be at least 1."
}

$Url = "http://127.0.0.1:$Port/"

function Wait-StemLab {
    param(
        [string]$HealthUrl,
        [System.Diagnostics.Process]$Process,
        [int]$TimeoutSeconds = 180
    )

    $deadline = [DateTime]::UtcNow.AddSeconds($TimeoutSeconds)
    while ([DateTime]::UtcNow -lt $deadline) {
        if ($Process.HasExited) {
            throw "StemLab exited before the web service became ready (exit code $($Process.ExitCode))."
        }
        try {
            $response = Invoke-WebRequest -UseBasicParsing -Uri $HealthUrl -TimeoutSec 2
            if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 300) {
                return
            }
        } catch {
            # The ASGI server or model environment may still be starting.
        }
        Start-Sleep -Milliseconds 500
    }
    throw "Timed out waiting for StemLab at $HealthUrl"
}

function Open-StemLabBrowser {
    param([string]$TargetUrl)
    if ($NoBrowser) {
        return
    }
    try {
        Start-Process $TargetUrl | Out-Null
    } catch {
        Write-Warning "Could not open the browser automatically. Open $TargetUrl manually."
    }
}

Write-Host ""
Write-Host "StemLab web service" -ForegroundColor Cyan
Write-Host "Browser URL: $Url" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the service." -ForegroundColor DarkGray
Write-Host ""

$process = $null
try {
    if ($Docker) {
        $docker = Get-Command docker -ErrorAction Stop
        & $docker.Source compose version *> $null
        if ($LASTEXITCODE -ne 0) {
            throw "Docker Compose is not available through 'docker compose'."
        }

        $resultsPath = if ([IO.Path]::IsPathRooted($Results)) {
            [IO.Path]::GetFullPath($Results)
        } else {
            [IO.Path]::GetFullPath((Join-Path $Root $Results))
        }
        New-Item -ItemType Directory -Force $resultsPath | Out-Null

        $env:STEMLAB_WEB_PORT = [string]$Port
        $env:STEMLAB_RESULTS_HOST_DIR = $resultsPath
        $env:STEMLAB_SERVICE_PROFILE = $Profile
        $env:STEMLAB_SERVICE_DEVICE = $Device
        $env:STEMLAB_SERVICE_MAX_JOBS = [string]$SchedulerJobs

        if ($Device -eq "cpu") {
            $arguments = @("compose", "--profile", "cpu", "up", "--build", "web-cpu")
        } else {
            $arguments = @("compose", "up", "--build", "web")
        }

        Write-Host "Starting Docker service..." -ForegroundColor Cyan
        $process = Start-Process -FilePath $docker.Source -ArgumentList $arguments -PassThru -NoNewWindow
    } else {
        $venvPython = Join-Path $Root ".venv\Scripts\python.exe"
        if (Test-Path $venvPython) {
            $python = $venvPython
        } else {
            $pythonCommand = Get-Command python -ErrorAction SilentlyContinue
            if (-not $pythonCommand) {
                $pythonCommand = Get-Command py -ErrorAction SilentlyContinue
            }
            if (-not $pythonCommand) {
                throw "Python was not found. Activate the StemLab environment or create .venv first."
            }
            $python = $pythonCommand.Source
        }

        $src = Join-Path $Root "src"
        if ($env:PYTHONPATH) {
            $env:PYTHONPATH = "$src$([IO.Path]::PathSeparator)$env:PYTHONPATH"
        } else {
            $env:PYTHONPATH = $src
        }

        New-Item -ItemType Directory -Force (Join-Path $Root $Results) | Out-Null

        $arguments = @(
            "-m", "stemlab.cli", "serve",
            "--host", "0.0.0.0",
            "--port", [string]$Port,
            "--results", $Results,
            "--scheduler-jobs", [string]$SchedulerJobs,
            "--profile", $Profile,
            "--device", $Device
        )
        Write-Host "Starting local Python service..." -ForegroundColor Cyan
        $process = Start-Process -FilePath $python -ArgumentList $arguments -PassThru -NoNewWindow
    }

    Wait-StemLab -HealthUrl "${Url}healthz" -Process $process
    Write-Host ""
    Write-Host "StemLab is ready: $Url" -ForegroundColor Green
    Open-StemLabBrowser -TargetUrl $Url

    $process.WaitForExit()
    exit $process.ExitCode
}
finally {
    if ($process -and -not $process.HasExited) {
        Write-Host "`nStopping StemLab..." -ForegroundColor Yellow
        try {
            Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
        } catch {}
    }
}
