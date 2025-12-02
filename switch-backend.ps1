# Script para cambiar entre backends (Local, AWS, Supabase)
# Uso: .\switch-backend.ps1 local|aws|supabase

param(
    [Parameter(Mandatory=$true, Position=0)]
    [ValidateSet('local', 'aws', 'supabase')]
    [string]$Backend
)

$envFile = ".env"

if (-not (Test-Path $envFile)) {
    Write-Host "❌ Error: Archivo .env no encontrado" -ForegroundColor Red
    exit 1
}

Write-Host "🔄 Cambiando backend a: $Backend" -ForegroundColor Cyan

$content = Get-Content $envFile -Raw
$content = $content -replace 'VITE_ACTIVE_BACKEND=\w+', "VITE_ACTIVE_BACKEND=$Backend"
Set-Content $envFile $content -NoNewline

Write-Host "✅ Backend cambiado a: $Backend" -ForegroundColor Green
Write-Host ""

# Mostrar la configuración según el backend
switch ($Backend) {
    'local' {
        Write-Host "📍 Usando Spring Boot Local" -ForegroundColor Yellow
        Write-Host "   URL: http://localhost:8080/api"
        Write-Host "   Asegúrate de tener Spring Boot corriendo en local"
    }
    'aws' {
        $awsUrl = (Select-String -Path $envFile -Pattern 'VITE_AWS_BACKEND_URL=(.+)').Matches.Groups[1].Value
        Write-Host "📍 Usando AWS EC2" -ForegroundColor Yellow
        Write-Host "   URL: $awsUrl"
        Write-Host "   Verifica que la IP de EC2 esté actualizada"
    }
    'supabase' {
        Write-Host "📍 Usando Supabase Backend" -ForegroundColor Yellow
        Write-Host "   URL: https://kivpcepyhfpqjfoycwel.supabase.co"
        Write-Host "   Nota: Requiere configuración adicional en Supabase"
    }
}

Write-Host ""
Write-Host "🔄 Reinicia el servidor de desarrollo:" -ForegroundColor Cyan
Write-Host "   npm run dev"
