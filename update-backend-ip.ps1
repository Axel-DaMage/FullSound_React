# Script para actualizar la IP del backend EC2 (AWS Learner Lab)
# Uso: .\update-backend-ip.ps1 54.123.45.67

param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$IpAddress
)

$envFile = ".env"
$envProdFile = ".env.production"

# Validar formato de IP
if ($IpAddress -notmatch '^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$') {
    Write-Host "❌ Error: Formato de IP inválido. Ejemplo: 54.123.45.67" -ForegroundColor Red
    exit 1
}

$newUrl = "http://$IpAddress:8080/api"

Write-Host "🔄 Actualizando IP del backend EC2..." -ForegroundColor Cyan
Write-Host "Nueva URL: $newUrl" -ForegroundColor Yellow

# Actualizar .env
if (Test-Path $envFile) {
    $content = Get-Content $envFile -Raw
    $content = $content -replace 'VITE_AWS_BACKEND_URL=http://[^\s]+', "VITE_AWS_BACKEND_URL=$newUrl"
    # También actualizar VITE_API_URL si no es localhost
    $content = $content -replace 'VITE_API_URL=http://(?!localhost)[^\s]+', "VITE_API_URL=$newUrl"
    # Asegurarse que ACTIVE_BACKEND sea aws
    $content = $content -replace 'VITE_ACTIVE_BACKEND=\w+', 'VITE_ACTIVE_BACKEND=aws'
    Set-Content $envFile $content -NoNewline
    Write-Host "✅ Actualizado: .env" -ForegroundColor Green
} else {
    Write-Host "⚠️  Archivo .env no encontrado" -ForegroundColor Yellow
}

# Actualizar .env.production
if (Test-Path $envProdFile) {
    $content = Get-Content $envProdFile -Raw
    $content = $content -replace 'VITE_AWS_BACKEND_URL=http://[^\s]+', "VITE_AWS_BACKEND_URL=$newUrl"
    $content = $content -replace 'VITE_API_URL=http://(?!localhost)[^\s]+', "VITE_API_URL=$newUrl"
    $content = $content -replace 'VITE_ACTIVE_BACKEND=\w+', 'VITE_ACTIVE_BACKEND=aws'
    Set-Content $envProdFile $content -NoNewline
    Write-Host "✅ Actualizado: .env.production" -ForegroundColor Green
} else {
    Write-Host "⚠️  Archivo .env.production no encontrado" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✨ IP actualizada correctamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Verifica la conexión: curl http://$IpAddress:8080/api/beats"
Write-Host "2. Ejecuta el frontend: npm run dev"
Write-Host ""
