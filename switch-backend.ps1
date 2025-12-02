param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("local", "aws", "supabase")]
    [string]$Backend
)

$envFile = ".env"

if (-not (Test-Path $envFile)) {
    Write-Host "Error: Archivo .env no encontrado" -ForegroundColor Red
    exit 1
}

Write-Host "Cambiando backend a: $Backend" -ForegroundColor Cyan

$content = Get-Content $envFile -Raw
$content = $content -replace "VITE_ACTIVE_BACKEND=\w+", "VITE_ACTIVE_BACKEND=$Backend"
Set-Content $envFile $content -NoNewline

Write-Host "Backend cambiado a: $Backend" -ForegroundColor Green

switch ($Backend) {
    "local" {
        Write-Host "Usando Spring Boot Local" -ForegroundColor Yellow
        Write-Host "URL: http://localhost:8080/api"
    }
    "aws" {
        Write-Host "Usando AWS EC2" -ForegroundColor Yellow
        Write-Host "URL configurada en VITE_AWS_BACKEND_URL"
    }
    "supabase" {
        Write-Host "Usando Supabase" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Reinicia el servidor: npm run dev" -ForegroundColor Cyan
