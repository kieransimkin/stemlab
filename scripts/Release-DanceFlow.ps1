#requires -Version 5.1
<#
.SYNOPSIS
Release the two viewer dependencies, then rebuild and release StemLab.
.DESCRIPTION
Assumes sibling checkouts named DanceRudiments, react-timeline-sequence and
stemlab. Preview is the default. -Execute authorizes scoped commits, ordinary
pushes and NEW release tags. -Resume continues the saved release session.
GitHub Actions, not this terminal, publishes to the configured registries.
.EXAMPLE
.\release-kit\Release-DanceFlow.ps1 -ProjectsRoot .
.EXAMPLE
.\release-kit\Release-DanceFlow.ps1 -ProjectsRoot . -Execute
.EXAMPLE
.\stemlab\scripts\Release-DanceFlow.ps1 -ProjectsRoot . -Execute -Resume
#>
[CmdletBinding()]
param(
    [string]$ProjectsRoot = (Get-Location).Path,
    [switch]$Execute,
    [switch]$Resume,
    [string]$DanceRudimentsVersion = '',
    [string]$TimelineVersion = '',
    [string]$StemLabVersion = '',
    [string]$StateFile = '',
    [ValidateRange(1, 1440)][int]$TimeoutMinutes = 420
)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$Root = (Resolve-Path -LiteralPath $ProjectsRoot).Path
$Python = (Get-Command python -CommandType Application -ErrorAction Stop | Select-Object -First 1).Source
$Runner = Join-Path $PSScriptRoot 'release_suite.py'
if (-not (Test-Path -LiteralPath $Runner -PathType Leaf)) {
    throw "Missing release_suite.py beside this script. Extract the complete release kit."
}
$Arguments = @($Runner, '--projects-root', $Root, '--timeout-minutes', "$TimeoutMinutes")
$PatchDirectory = Join-Path $PSScriptRoot 'patches'
if (Test-Path -LiteralPath $PatchDirectory -PathType Container) {
    $Arguments += @('--patch-dir', $PatchDirectory)
}
if ($Execute) { $Arguments += '--execute' }
if ($Resume) { $Arguments += '--resume' }
if ($DanceRudimentsVersion) { $Arguments += @('--dancerudiments-version', $DanceRudimentsVersion) }
if ($TimelineVersion) { $Arguments += @('--timeline-version', $TimelineVersion) }
if ($StemLabVersion) { $Arguments += @('--stemlab-version', $StemLabVersion) }
if ($StateFile) { $Arguments += @('--state-file', [System.IO.Path]::GetFullPath($StateFile)) }
$PreviousUtf8 = $env:PYTHONUTF8
try {
    $env:PYTHONUTF8 = '1'
    & $Python @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "The release coordinator stopped (exit $LASTEXITCODE). Read the error above; no downstream release was forced."
    }
}
finally {
    $env:PYTHONUTF8 = $PreviousUtf8
}
