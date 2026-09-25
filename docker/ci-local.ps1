[CmdletBinding()]
param(
    [string]$Image = "stemlab-ci-local"
)

$ErrorActionPreference = "Stop"

Write-Host "=== StemLab local container CI ==="
docker version | Out-Host
if ($LASTEXITCODE -ne 0) {
    throw "Docker is not available. Start Docker Desktop or Docker Engine and retry."
}

docker build `
    --pull `
    --progress=plain `
    --build-arg STEMLAB_BUILD_REF=local-working-tree `
    -f docker/Dockerfile `
    -t $Image `
    .

if ($LASTEXITCODE -ne 0) {
    throw "StemLab Docker build failed."
}

docker run `
    --rm `
    --entrypoint /opt/stemlab-docker/verify-environment.sh `
    $Image `
    runtime

if ($LASTEXITCODE -ne 0) {
    throw "StemLab container runtime verification failed."
}

Write-Host "StemLab local container CI passed." -ForegroundColor Green
