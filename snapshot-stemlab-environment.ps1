[CmdletBinding()]
param(
    [string]$OutputZip = "stemlab-working-environment.zip"
)

$ErrorActionPreference = "Continue"
$dir = Join-Path (Get-Location) "environment-snapshot"

if (Test-Path $dir) {
    Remove-Item -Recurse -Force $dir
}
New-Item -ItemType Directory -Force $dir | Out-Null

Write-Host "Capturing Python packages..."
uv pip freeze | Set-Content (Join-Path $dir "python-packages.txt")
uv pip check 2>&1 | Set-Content (Join-Path $dir "python-package-check.txt")
uv pip list --format freeze |
    Select-String -Pattern '^(torch|torchaudio|numpy|scipy|soundfile|demucs|openunmix|faster-whisper|beat-this|beatnet|madmom-prebuilt|cython|matplotlib|typer|rich)==' |
    ForEach-Object { $_.Line } |
    Set-Content (Join-Path $dir "important-packages.txt")

Write-Host "Capturing Python runtime..."
@'
import sys
import platform

print("python=" + sys.version.replace("\n", " "))
print("executable=" + sys.executable)
print("platform=" + platform.platform())
print("machine=" + platform.machine())
'@ | python - | Set-Content (Join-Path $dir "python-runtime.txt")

Write-Host "Capturing PyTorch / CUDA runtime..."
@'
import torch

print("torch=" + str(torch.__version__))
print("cuda_build=" + str(torch.version.cuda))
print("cuda_available=" + str(torch.cuda.is_available()))
print("cudnn=" + str(torch.backends.cudnn.version()))
print("device_count=" + str(torch.cuda.device_count()))
for i in range(torch.cuda.device_count()):
    print("gpu_" + str(i) + "=" + torch.cuda.get_device_name(i))
'@ | python - | Set-Content (Join-Path $dir "pytorch-runtime.txt")

Write-Host "Capturing NVIDIA driver..."
$nvidia = Get-Command nvidia-smi -ErrorAction SilentlyContinue
if ($nvidia) {
    & $nvidia.Source 2>&1 | Set-Content (Join-Path $dir "nvidia-smi.txt")
} else {
    "nvidia-smi not found" | Set-Content (Join-Path $dir "nvidia-smi.txt")
}

Write-Host "Capturing FFmpeg..."
$ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
if ($ffmpeg) {
    & $ffmpeg.Source -version 2>&1 | Set-Content (Join-Path $dir "ffmpeg.txt")
} else {
    "ffmpeg not found on PATH" | Set-Content (Join-Path $dir "ffmpeg.txt")
}

Write-Host "Locating Sonic Annotator..."
$sa = @'
from stemlab.vamp_runtime import ensure_sonic_annotator
print(ensure_sonic_annotator(False))
'@ | python -

$sa = ($sa | Select-Object -Last 1).Trim()
"sonic-annotator=$sa" | Set-Content (Join-Path $dir "sonic-annotator-path.txt")

if ($sa -and (Test-Path $sa)) {
    & $sa --version 2>&1 | Set-Content (Join-Path $dir "sonic-annotator-version.txt")
    & $sa -l 2>&1 | Set-Content (Join-Path $dir "vamp-plugins.txt")
} else {
    "Sonic Annotator not found at: $sa" | Set-Content (Join-Path $dir "sonic-annotator-version.txt")
    "Sonic Annotator unavailable" | Set-Content (Join-Path $dir "vamp-plugins.txt")
}

Write-Host "Capturing Git state..."
git rev-parse HEAD 2>&1 | Set-Content (Join-Path $dir "stemlab-commit.txt")
git status --short 2>&1 | Set-Content (Join-Path $dir "stemlab-git-status.txt")
git remote -v 2>&1 | Set-Content (Join-Path $dir "git-remotes.txt")

Write-Host "Capturing relevant environment variables..."
Get-ChildItem Env: |
    Sort-Object Name |
    Where-Object {
        $_.Name -match '^(CUDA|CUDNN|VAMP|STEMLAB|PYTHON|PATH|CONDA|VIRTUAL_ENV)'
    } |
    Format-Table -AutoSize |
    Out-String |
    Set-Content (Join-Path $dir "relevant-environment.txt")

Write-Host "Capturing Windows details..."
try {
    Get-ComputerInfo |
        Select-Object WindowsProductName, WindowsVersion, OsBuildNumber, OsArchitecture |
        Format-List |
        Out-String |
        Set-Content (Join-Path $dir "windows.txt")
} catch {
    "Get-ComputerInfo failed: $($_.Exception.Message)" | Set-Content (Join-Path $dir "windows.txt")
}

Write-Host "Creating ZIP..."
if (Test-Path $OutputZip) {
    Remove-Item -Force $OutputZip
}
Compress-Archive -Force (Join-Path $dir "*") $OutputZip

Write-Host ""
Write-Host "Snapshot complete:" -ForegroundColor Green
Write-Host (Resolve-Path $OutputZip)
