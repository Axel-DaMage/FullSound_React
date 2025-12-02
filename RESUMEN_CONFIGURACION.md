# 🎵 FullSound React - Resumen de Configuración

## ✅ Sistema Configurado Exitosamente

Tu aplicación FullSound ahora está completamente configurada para funcionar con **3 backends diferentes** y deployment automático.

---

## 🎯 Características Principales

### 1. **Multi-Backend Automático**
- ✅ Spring Boot Local (`localhost:8080`)
- ✅ AWS EC2 Learner Lab (IP dinámica)
- ✅ Supabase (alternativa cloud)
- ✅ **Fallback automático** si un backend no responde

### 2. **Scripts de Gestión**
- `switch-backend.ps1` - Cambiar entre backends
- `update-backend-ip.ps1` - Actualizar IP de AWS Learner Lab

### 3. **GitHub Actions (4 workflows)**
- **Simple Deploy** - Deployment manual (más fácil)
- **Auto Deploy** - Detecta IP automáticamente
- **Update IP** - Solo actualiza la IP
- **Check IP** - Monitoreo cada 30 minutos

### 4. **Componentes Actualizados**
- `AdminBeats.jsx` - Usa campos correctos del backend (`titulo`, `imagenUrl`, `audioUrl`)
- `api.js` - Soporte multi-backend con detección automática
- `beatsService.js` - Integración con Supabase Storage

---

## 🚀 Uso Diario

### Escenario 1: Desarrollo Local con Spring Boot

```powershell
# 1. Configura el backend
.\switch-backend.ps1 local

# 2. Ejecuta Spring Boot (en otra terminal)
cd backend
./mvnw spring-boot:run

# 3. Ejecuta el frontend
npm run dev

# 4. Abre http://localhost:5173/FullSound_React/
```

---

### Escenario 2: Desarrollo con AWS Learner Lab

```powershell
# 1. Inicia AWS Learner Lab y obtén la IP de EC2

# 2. Actualiza la IP
.\update-backend-ip.ps1 54.227.183.6

# 3. Ejecuta el frontend
npm run dev

# El frontend se conecta automáticamente a AWS
```

---

### Escenario 3: Deployment en Producción

**Opción A - GitHub Actions (Recomendado):**
1. Ve a GitHub → Actions
2. Selecciona "🔄 Actualizar IP - Simple"
3. Ingresa tu IP de EC2
4. Run workflow
5. ✅ Se despliega automáticamente

**Opción B - Vercel Manual:**
```powershell
# 1. Actualiza la IP
.\update-backend-ip.ps1 54.227.183.6

# 2. Build
npm run build

# 3. Deploy
vercel --prod
```

---

## 📋 Configuración Actual

### Backend Activo
```env
VITE_ACTIVE_BACKEND=aws  # Cambiado a AWS
```

### URLs Configuradas
```env
Local:    http://localhost:8080/api
AWS:      http://54.227.183.6:8080/api
Supabase: https://kivpcepyhfpqjfoycwel.supabase.co
```

### Frontend
```
Desarrollo: http://localhost:5173/FullSound_React/
Producción: (Configurar en Vercel/Netlify)
```

---

## 🔄 Cambiar de Backend

```powershell
# Usar Local
.\switch-backend.ps1 local

# Usar AWS
.\switch-backend.ps1 aws

# Usar Supabase
.\switch-backend.ps1 supabase

# Después de cambiar, reinicia:
npm run dev
```

---

## 🌐 GitHub Actions - Configuración

### Para Usar el Workflow Simple (Sin AWS Credentials)

1. **Ve a GitHub:**
   `https://github.com/Axel-DaMage/FullSound_React/actions`

2. **Selecciona:** "🔄 Actualizar IP - Simple"

3. **Run workflow:** Ingresa tu IP de EC2

4. **Resultado:** Se actualiza y despliega automáticamente

### Para Auto-Detección (Requiere AWS Secrets)

**Configurar una sola vez:**

1. Inicia AWS Learner Lab
2. AWS Details → Show → Copia credentials
3. GitHub → Settings → Secrets → Actions
4. Agrega:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_SESSION_TOKEN`

⚠️ **Nota:** Estas credenciales expiran cada 4 horas. Actualízalas al reiniciar el lab.

---

## 📊 Archivos Importantes

| Archivo | Descripción |
|---------|-------------|
| `.env` | Configuración de desarrollo |
| `.env.production` | Configuración de producción |
| `src/config/environment.js` | Lógica multi-backend |
| `src/services/api.js` | Cliente HTTP con fallback |
| `src/components/AdminBeats.jsx` | CRUD de beats actualizado |
| `switch-backend.ps1` | Script para cambiar backend |
| `update-backend-ip.ps1` | Script para actualizar IP |

---

## 📚 Documentación Completa

| Guía | Descripción |
|------|-------------|
| `MULTI_BACKEND_GUIDE.md` | Uso del sistema multi-backend |
| `LEARNER_LAB_GUIDE.md` | Guía específica AWS Learner Lab |
| `GITHUB_ACTIONS_GUIDE.md` | Uso de GitHub Actions |
| `DEPLOYMENT_GUIDE.md` | Opciones de deployment |
| `EC2_SETUP.md` | Configuración de EC2 |

---

## 🐛 Solución de Problemas

### Frontend no se conecta

```powershell
# Verifica la configuración
cat .env | Select-String "ACTIVE\|API_URL"

# Verifica que el backend responda
curl http://54.227.183.6:8080/api/beats

# Reinicia el servidor
# Ctrl+C y luego
npm run dev
```

### IP de AWS cambió

```powershell
# Opción 1: Script local (más rápido)
.\update-backend-ip.ps1 NUEVA-IP

# Opción 2: GitHub Actions
# GitHub → Actions → Simple Deploy → Ingresa IP
```

### Error CORS

Verifica que tu backend Spring Boot tenga configurado CORS:

```java
// WebConfig.java
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
            .allowedOrigins(
                "http://localhost:5173",
                "https://*.vercel.app"
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowCredentials(true);
}
```

---

## ⭐ Flujo Recomendado

### Desarrollo Diario

```
1. Switch a backend deseado
   .\switch-backend.ps1 local|aws

2. Ejecutar frontend
   npm run dev

3. Desarrollar y probar

4. Commit y push
   git add .
   git commit -m "Feature"
   git push
```

### Deployment a Producción

```
1. Actualizar IP de AWS
   .\update-backend-ip.ps1 IP

2. GitHub Actions
   Run workflow → Simple Deploy

3. ✅ Listo en producción
```

---

## 🔗 Enlaces Útiles

- **Frontend Local:** http://localhost:5173/FullSound_React/
- **Backend AWS:** http://54.227.183.6:8080/swagger-ui/index.html
- **GitHub Repo:** https://github.com/Axel-DaMage/FullSound_React
- **GitHub Actions:** https://github.com/Axel-DaMage/FullSound_React/actions

---

## 📞 Próximos Pasos

### Opcional - Deploy en Vercel

```powershell
# Instalar CLI
npm install -g vercel

# Login
vercel login

# Linkear proyecto
vercel link

# Deploy
vercel --prod
```

### Opcional - Configurar DuckDNS (IP Fija)

1. Regístrate en [duckdns.org](https://www.duckdns.org)
2. Crea un dominio: `fullsound.duckdns.org`
3. Configura en tu EC2 para actualización automática
4. Usa el dominio en lugar de la IP

---

## ✨ ¡Todo Listo!

Tu aplicación FullSound está completamente configurada y lista para:
- ✅ Desarrollo local
- ✅ Desarrollo con AWS
- ✅ Deployment automático
- ✅ Fallback entre backends
- ✅ GitHub Actions configuradas

**Comando para empezar:**
```powershell
npm run dev
```

¡Disfruta desarrollando! 🎵

