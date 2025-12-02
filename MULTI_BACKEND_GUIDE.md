# 🔄 Configuración Multi-Backend - FullSound

## 📋 Descripción

FullSound ahora soporta **3 backends diferentes** con **fallback automático**:

1. **Local** - Spring Boot en localhost:8080
2. **AWS EC2** - Backend en AWS Learner Lab (IP dinámica)
3. **Supabase** - Backend alternativo en la nube

## 🎯 Funcionamiento Automático

El sistema **detecta automáticamente** qué backend está disponible:

```
1. Intenta el backend configurado (VITE_ACTIVE_BACKEND)
   ↓ Si no responde
2. Intenta AWS
   ↓ Si no responde
3. Intenta Local
   ↓ Si no responde
4. Intenta Supabase
   ↓
5. Usa el configurado por defecto
```

## ⚙️ Configuración

### Variables de Entorno

#### `.env` (Desarrollo)
```env
# Backend activo: 'local', 'aws', 'supabase'
VITE_ACTIVE_BACKEND=local

# URL del backend local
VITE_API_URL=http://localhost:8080/api

# URL del backend en AWS (actualizar cuando cambie la IP)
VITE_AWS_BACKEND_URL=http://54.227.183.6:8080/api

# URL de Supabase
VITE_SUPABASE_BACKEND_URL=https://kivpcepyhfpqjfoycwel.supabase.co/rest/v1

# Configuración de Supabase Storage
VITE_SUPABASE_PROJECT_URL=https://kivpcepyhfpqjfoycwel.supabase.co
VITE_SUPABASE_BUCKET_IMAGES=Imagenes
VITE_SUPABASE_BUCKET_AUDIO=audios
```

#### `.env.production` (Producción)
```env
# En producción usa AWS por defecto
VITE_ACTIVE_BACKEND=aws
VITE_AWS_BACKEND_URL=http://54.227.183.6:8080/api
```

## 🚀 Uso Rápido

### Cambiar entre Backends

```powershell
# Usar backend local
.\switch-backend.ps1 local

# Usar backend en AWS
.\switch-backend.ps1 aws

# Usar Supabase
.\switch-backend.ps1 supabase
```

### Actualizar IP de AWS Learner Lab

```powershell
# Cuando reinicies Learner Lab, actualiza la IP:
.\update-backend-ip.ps1 54.227.183.6
```

Este script:
- ✅ Actualiza `VITE_AWS_BACKEND_URL`
- ✅ Cambia `VITE_ACTIVE_BACKEND` a 'aws'
- ✅ Actualiza tanto `.env` como `.env.production`

## 📝 Escenarios de Uso

### Escenario 1: Desarrollo Local

```powershell
# 1. Inicia Spring Boot localmente
cd backend
./mvnw spring-boot:run

# 2. Configura el frontend para usar local
.\switch-backend.ps1 local

# 3. Ejecuta el frontend
npm run dev
```

**Resultado:** Frontend conecta a `http://localhost:8080/api`

---

### Escenario 2: AWS Learner Lab

```powershell
# 1. Inicia AWS Learner Lab
# 2. Obtén la IP de EC2: 54.227.183.6

# 3. Actualiza la IP
.\update-backend-ip.ps1 54.227.183.6

# 4. Ejecuta el frontend
npm run dev
```

**Resultado:** Frontend conecta a `http://54.227.183.6:8080/api`

---

### Escenario 3: Fallback Automático

```powershell
# Configura AWS pero no está disponible
.\switch-backend.ps1 aws

# Ejecuta el frontend
npm run dev
```

**Resultado:** 
```
[ENV] Verificando backend preferido: http://54.227.183.6:8080/api
[ENV] ⚠️ Backend aws no disponible, intentando fallbacks...
[ENV] Intentando fallback: local (http://localhost:8080/api)
[ENV] ✅ Fallback exitoso a local
```

---

### Escenario 4: Producción con AWS

```powershell
# 1. Actualiza la IP en .env.production
.\update-backend-ip.ps1 54.227.183.6

# 2. Build para producción
npm run build

# 3. Deploy a Vercel/Netlify
# El sistema usará AWS con fallback automático
```

## 🔍 Verificación de Backend

### Ver configuración actual

```powershell
npm run dev
```

En la consola del navegador verás:
```
=== FullSound Environment Configuration ===
Mode: Development
Active Backend: aws
Backend URL: http://54.227.183.6:8080/api
Supabase URL: https://kivpcepyhfpqjfoycwel.supabase.co
==========================================
```

### Probar disponibilidad

El sistema verifica automáticamente al iniciar. También puedes probar manualmente:

```powershell
# Local
curl http://localhost:8080/api/beats

# AWS
curl http://54.227.183.6:8080/api/beats

# Supabase (si está configurado)
curl https://kivpcepyhfpqjfoycwel.supabase.co/rest/v1/beats
```

## 📦 Archivos de Ejemplo

### Para desarrollo local puro:
```powershell
cp .env.local.example .env.local
npm run dev
```

### Para AWS EC2:
```powershell
cp .env.aws.example .env.local
# Edita .env.local con tu IP de EC2
npm run dev
```

## 🎨 Personalización Avanzada

### Forzar un backend específico

Edita `src/config/environment.js`:

```javascript
const getActiveBackend = () => {
  return BACKENDS.AWS; // Fuerza AWS siempre
};
```

### Deshabilitar fallback automático

```javascript
export const getAvailableBackend = async () => {
  return getBackendUrl(); // Sin verificación ni fallback
};
```

### Agregar nuevo backend

```javascript
const BACKENDS = {
  LOCAL: 'local',
  AWS: 'aws',
  SUPABASE: 'supabase',
  CUSTOM: 'custom' // Nuevo backend
};

const BACKEND_URLS = {
  // ...
  [BACKENDS.CUSTOM]: 'https://mi-backend.com/api'
};
```

## 🐛 Troubleshooting

### El frontend no se conecta a ningún backend

**Solución:**
```powershell
# Verifica las URLs en .env
cat .env

# Prueba manualmente cada backend
curl http://localhost:8080/api/beats
curl http://54.227.183.6:8080/api/beats

# Verifica la consola del navegador
# Debe mostrar los intentos de conexión
```

### Fallback no funciona

**Solución:**
- El timeout es de 3 segundos por backend
- Verifica que los backends estén en URLs correctas
- Revisa la consola del navegador para logs detallados

### IP de AWS actualizada pero sigue usando la antigua

**Solución:**
```powershell
# 1. Actualiza con el script
.\update-backend-ip.ps1 NUEVA-IP

# 2. Verifica el archivo .env
cat .env | Select-String "AWS"

# 3. Reinicia el servidor de desarrollo
# Ctrl+C y luego
npm run dev
```

## 🔗 Integración con GitHub Actions

Los workflows de GitHub Actions también soportan multi-backend:

```yaml
# En .github/workflows/simple-deploy.yml
- name: Actualizar .env.production
  run: |
    cat > .env.production << EOF
    VITE_ACTIVE_BACKEND=aws
    VITE_AWS_BACKEND_URL=http://${{ github.event.inputs.ec2_ip }}:8080/api
    VITE_API_URL=http://localhost:8080/api
    # ... resto de la configuración
    EOF
```

## 📊 Resumen de Comandos

| Comando | Descripción |
|---------|-------------|
| `.\switch-backend.ps1 local` | Cambiar a backend local |
| `.\switch-backend.ps1 aws` | Cambiar a AWS EC2 |
| `.\switch-backend.ps1 supabase` | Cambiar a Supabase |
| `.\update-backend-ip.ps1 IP` | Actualizar IP de AWS |
| `npm run dev` | Ejecutar en desarrollo |
| `npm run build` | Build para producción |

