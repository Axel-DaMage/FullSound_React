# Script de Despliegue Automático a AWS EC2
# Uso: .\deploy-to-aws.ps1 -KeyPath "ruta/a/clave.pem" [-BackendPath "/home/ec2-user/backend"]

param(
    [Parameter(Mandatory=$true)]
    [string]$KeyPath,
    
    [Parameter(Mandatory=$false)]
    [string]$ServerIP = "54.147.197.23",
    
    [Parameter(Mandatory=$false)]
    [string]$User = "ec2-user",
    
    [Parameter(Mandatory=$false)]
    [string]$BackendPath = "/home/ec2-user/fullsound-backend"
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Iniciando despliegue a AWS EC2..." -ForegroundColor Cyan
Write-Host ""

# 1. Construir el frontend
Write-Host "📦 Paso 1: Construyendo frontend..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "   Carpeta dist anterior eliminada" -ForegroundColor Gray
}

npm run build

if (-not (Test-Path "dist")) {
    Write-Host "❌ Error: La carpeta dist no se generó correctamente" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completado" -ForegroundColor Green
Write-Host ""

# 2. Crear archivo temporal con los archivos
Write-Host "📁 Paso 2: Preparando archivos..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$zipFile = "frontend_$timestamp.zip"

Compress-Archive -Path "dist\*" -DestinationPath $zipFile -Force
Write-Host "✅ Archivos comprimidos en $zipFile" -ForegroundColor Green
Write-Host ""

# 3. Validar clave SSH
if (-not (Test-Path $KeyPath)) {
    Write-Host "❌ Error: No se encontró la clave SSH en $KeyPath" -ForegroundColor Red
    exit 1
}

# 4. Copiar al servidor
Write-Host "📤 Paso 3: Copiando archivos al servidor AWS..." -ForegroundColor Yellow
Write-Host "   Servidor: $User@$ServerIP" -ForegroundColor Gray
Write-Host "   Destino: $BackendPath/src/main/resources/static/" -ForegroundColor Gray

try {
    # Copiar el zip al servidor
    scp -i $KeyPath $zipFile "${User}@${ServerIP}:/tmp/"
    Write-Host "✅ Archivo copiado al servidor" -ForegroundColor Green
    Write-Host ""
    
    # 5. Descomprimir y mover archivos en el servidor
    Write-Host "📂 Paso 4: Instalando archivos en el servidor..." -ForegroundColor Yellow
    
    $commands = @"
cd /tmp && \
unzip -o $zipFile -d frontend_temp && \
rm -rf $BackendPath/src/main/resources/static/* && \
mkdir -p $BackendPath/src/main/resources/static && \
cp -r frontend_temp/* $BackendPath/src/main/resources/static/ && \
rm -rf frontend_temp $zipFile && \
echo "Archivos instalados correctamente"
"@
    
    ssh -i $KeyPath "${User}@${ServerIP}" $commands
    Write-Host "✅ Archivos instalados en el servidor" -ForegroundColor Green
    Write-Host ""
    
} catch {
    Write-Host "❌ Error al copiar archivos: $_" -ForegroundColor Red
    exit 1
} finally {
    # Limpiar archivo temporal local
    if (Test-Path $zipFile) {
        Remove-Item $zipFile
        Write-Host "🧹 Archivo temporal local eliminado" -ForegroundColor Gray
    }
}

# 6. Mensaje de finalización
Write-Host "✨ ¡Despliegue completado exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos pasos en el servidor AWS:" -ForegroundColor Cyan
Write-Host "   1. Conectar: ssh -i $KeyPath ${User}@${ServerIP}" -ForegroundColor White
Write-Host "   2. Navegar: cd $BackendPath" -ForegroundColor White
Write-Host "   3. Construir backend (si es necesario): ./mvnw clean package" -ForegroundColor White
Write-Host "   4. Reiniciar servidor: ./mvnw spring-boot:run" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Acceder al sitio: http://$ServerIP:8080/" -ForegroundColor Cyan
Write-Host ""

# Opcional: Preguntar si desea reiniciar el backend
$restart = Read-Host "¿Deseas reiniciar el backend ahora? (s/n)"
if ($restart -eq "s" -or $restart -eq "S") {
    Write-Host ""
    Write-Host "🔄 Reiniciando backend..." -ForegroundColor Yellow
    
    $restartCommands = @"
cd $BackendPath && \
pkill -f 'java.*fullsound' || true && \
nohup ./mvnw spring-boot:run > /dev/null 2>&1 &
"@
    
    ssh -i $KeyPath "${User}@${ServerIP}" $restartCommands
    Write-Host "✅ Backend reiniciado" -ForegroundColor Green
    Write-Host ""
    Write-Host "⏳ Espera unos segundos y luego accede a: http://$ServerIP:8080/" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 ¡Todo listo!" -ForegroundColor Green
