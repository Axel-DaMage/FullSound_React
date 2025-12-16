# 🚀 Integración Frontend con Backend AWS

Este frontend está configurado para trabajar con el backend Spring Boot desplegado en AWS EC2 y usar Supabase para almacenamiento de archivos.

## 📋 Configuración Actual

### Backend AWS EC2
- **URL**: `http://54.147.197.23:8080/api`
- **Base de datos**: PostgreSQL en Supabase
- **Autenticación**: JWT

### Supabase Storage
- **Proyecto**: `https://kivpcepyhfpqjfoycwel.supabase.co`
- **Bucket de Imágenes**: `Imagenes`
- **Bucket de Audio**: `audios`

## 🔧 Variables de Entorno

El proyecto usa variables de entorno para configurar las URLs. Ver [.env.example](.env.example) para referencia.

### Desarrollo Local
Crear archivo `.env` en la raíz:
```env
VITE_API_URL=http://54.147.197.23:8080/api
VITE_ACTIVE_BACKEND=aws
VITE_SUPABASE_PROJECT_URL=https://kivpcepyhfpqjfoycwel.supabase.co
VITE_SUPABASE_BUCKET_IMAGES=Imagenes
VITE_SUPABASE_BUCKET_AUDIO=audios
```

### Producción (en AWS)
El archivo `.env.production` ya está configurado con rutas relativas para servirse desde Spring Boot.

## 🏗️ Integración con Backend (GitHub Actions)

El workflow de GitHub Actions del backend (`FULLSOUND-SPRINGBOOT`) automáticamente:

1. ✅ Clona este repositorio frontend
2. ✅ Construye el frontend (`npm run build`)
3. ✅ Copia `dist/` a `src/main/resources/static/` del backend
4. ✅ Construye el JAR con el frontend incluido
5. ✅ Despliega a AWS EC2

## 📦 Build y Deploy

### Build Local
```bash
npm install
npm run build
```

### Deploy Automático
El deploy se hace automáticamente cuando:
- Se hace push al branch `main` del backend
- El workflow de GitHub Actions se ejecuta

### Deploy Manual (Script PowerShell)
```powershell
.\deploy-to-aws.ps1 -KeyPath "ruta/a/clave.pem"
```

## 🔄 Flujo de Datos

```
Frontend React
    ↓
    ├─→ Backend AWS EC2 (http://54.147.197.23:8080/api)
    │       ↓
    │       └─→ PostgreSQL (Supabase)
    │
    └─→ Supabase Storage
            ├─→ Imagenes (imágenes de beats)
            └─→ audios (archivos de audio)
```

## 📝 Archivos de Configuración

- **[src/config/environment.js](src/config/environment.js)** - Configuración de entorno y backends
- **[src/services/api.js](src/services/api.js)** - Cliente Axios configurado
- **[src/services/beatsService.js](src/services/beatsService.js)** - Servicio de beats con Supabase
- **[.env.production](.env.production)** - Variables para producción
- **[.env.example](.env.example)** - Template de variables de entorno

## 🧪 Testing

```bash
npm run test           # Ejecutar tests
npm run test:watch     # Tests en modo watch
npm run test:ci        # Tests con cobertura
```

## 🌐 URLs de Producción

- **Frontend**: `http://54.147.197.23:8080/`
- **API Backend**: `http://54.147.197.23:8080/api/`
- **Health Check**: `http://54.147.197.23:8080/actuator/health`

## 🔐 Autenticación

El sistema usa JWT (JSON Web Tokens):
1. Login en `/api/auth/login`
2. Token guardado en `localStorage`
3. Token incluido en header `Authorization: Bearer {token}`

## 📚 Documentación Adicional

- [DESPLIEGUE_AWS.md](DESPLIEGUE_AWS.md) - Guía completa de despliegue
- [INSTRUCCIONES_DESPLIEGUE.md](INSTRUCCIONES_DESPLIEGUE.md) - Instrucciones rápidas
- Backend Repository: [FULLSOUND-SPRINGBOOT](https://github.com/VECTORG99/FULLSOUND-SPRINGBOOT)

## 🆘 Troubleshooting

### El frontend no se conecta al backend
```bash
curl http://54.147.197.23:8080/api/beats
```

### Las imágenes no cargan
Verificar que las URLs de Supabase estén correctas en la consola del navegador.

### Error de CORS
Verificar configuración de CORS en el backend Spring Boot.

## 📞 Contacto

Para issues o preguntas, crear un issue en el repositorio correspondiente:
- Frontend: [FullSound_React](https://github.com/Axel-DaMage/FullSound_React)
- Backend: [FULLSOUND-SPRINGBOOT](https://github.com/VECTORG99/FULLSOUND-SPRINGBOOT)
