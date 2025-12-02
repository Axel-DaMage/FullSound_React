# 🤖 Guía de Configuración - GitHub Actions para AWS Learner Lab

## 📋 Workflows Creados

### 1. **simple-deploy.yml** ⭐ RECOMENDADO
- **Más fácil:** Solo necesitas ingresar la IP manualmente
- No requiere configurar AWS credentials
- Actualiza y despliega automáticamente
- **Uso:** Actions → Simple Deploy → Ingresa IP → Run

### 2. **auto-deploy.yml** - Deployment Automático Completo
- Detecta la IP de EC2 automáticamente
- Requiere AWS credentials en GitHub Secrets
- Se ejecuta en cada push o manualmente

### 3. **update-ip.yml** - Solo Actualizar IP
- Actualiza la IP cuando reinicies Learner Lab
- Puede auto-detectar o usar IP manual

### 4. **check-ip.yml** - Monitoreo Automático
- Verifica cada 30 minutos si la IP cambió
- Actualiza automáticamente

---

## 🚀 Método Más Fácil (Sin AWS Credentials)

### Paso 1: Sube tu código a GitHub

```powershell
git add .
git commit -m "Add GitHub Actions workflows"
git push origin main
```

### Paso 2: Cada vez que reinicies Learner Lab

1. **Obtén la IP de EC2:**
   - Ve a AWS Console → EC2 → Copia la IP pública

2. **Ejecuta el workflow:**
   - Ve a tu repo en GitHub
   - Click en **"Actions"**
   - Selecciona **"🔄 Actualizar IP - Simple"**
   - Click en **"Run workflow"**
   - Ingresa tu IP (ej: `54.227.183.6`)
   - Click en **"Run workflow"**

3. **GitHub automáticamente:**
   - Actualiza `.env.production`
   - Construye el proyecto
   - Despliega a Vercel (si está configurado)

---

## 🔐 Método Avanzado (Con Auto-detección)

### Configuración Inicial (Una vez)

#### 1. Obtener Credenciales de AWS Learner Lab

**Cada vez que inicies el lab:**

1. Inicia AWS Academy Learner Lab
2. Click en **"AWS Details"**
3. Click en **"Show"** en la sección AWS CLI
4. Verás algo como:

```ini
[default]
aws_access_key_id=ASIAXXX...
aws_secret_access_key=xxx...
aws_session_token=FwoGZXIv...
```

#### 2. Configurar GitHub Secrets

1. Ve a tu repositorio en GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Agrega estos 3 secrets:

| Nombre | Valor |
|--------|-------|
| `AWS_ACCESS_KEY_ID` | Tu access key de AWS CLI |
| `AWS_SECRET_ACCESS_KEY` | Tu secret key de AWS CLI |
| `AWS_SESSION_TOKEN` | Tu session token (el más largo) |

⚠️ **Estas credenciales expiran en 4 horas**. Actualízalas cada vez que reinicies el lab.

#### 3. Configurar Vercel (Opcional)

**Para deployment automático:**

1. Crea cuenta en [vercel.com](https://vercel.com)
2. Conecta con GitHub
3. Importa tu repositorio

**Obtener tokens:**

```powershell
# Instala Vercel CLI
npm install -g vercel

# Login
vercel login

# En tu proyecto, ejecuta:
vercel link

# Esto crea .vercel/project.json con tus IDs
```

4. Agrega a GitHub Secrets:
   - `VERCEL_TOKEN` - De Vercel Settings → Tokens
   - `VERCEL_ORG_ID` - De `.vercel/project.json`
   - `VERCEL_PROJECT_ID` - De `.vercel/project.json`

---

## 📱 Cómo Usar

### Opción A: Workflow Simple (Recomendado)

```
1. Reinicia Learner Lab
2. Copia la IP de EC2: 54.227.183.6
3. GitHub → Actions → "Simple Deploy"
4. Run workflow → Ingresa IP
5. ✅ ¡Listo!
```

### Opción B: Auto-detección (Requiere AWS Secrets)

```
1. Reinicia Learner Lab
2. Actualiza AWS secrets en GitHub (expiran cada 4h)
3. GitHub → Actions → "Auto Deploy"
4. Run workflow
5. ✅ Detecta IP y despliega automáticamente
```

### Opción C: Push Automático

```powershell
# Con AWS secrets configurados:
git add .
git commit -m "Update"
git push

# GitHub Actions se ejecuta automáticamente
```

---

## 🎯 Flujo de Trabajo Recomendado

### Para Desarrollo Diario:

1. **Al iniciar Learner Lab:**
```powershell
# Opción 1: Script local (más rápido)
.\update-backend-ip.ps1 54.227.183.6
npm run dev
```

2. **Para deployment en producción:**
```
GitHub Actions → Simple Deploy → Ingresa IP
```

---

## 🔍 Troubleshooting

### "Unable to resolve AWS credentials"
**Causa:** AWS secrets no configurados o expirados
**Solución:** 
- Usa el workflow **simple-deploy.yml** (no requiere AWS secrets)
- O actualiza los secrets de AWS

### "Vercel deployment failed"
**Causa:** Tokens de Vercel no configurados
**Solución:**
- Configura los secrets de Vercel (ver arriba)
- O despliega manualmente después del build

### Workflow no aparece en Actions
**Causa:** Los archivos no están en `main`
**Solución:**
```powershell
git add .github/
git commit -m "Add workflows"
git push origin main
```

---

## 📊 Comparación de Métodos

| Método | Pros | Contras | Mejor Para |
|--------|------|---------|------------|
| **Script Local** | Instantáneo, simple | Solo actualiza local | Desarrollo |
| **Simple Deploy** | No expira, fácil | Requiere ingresar IP | Producción |
| **Auto Deploy** | 100% automático | Secrets expiran cada 4h | CI/CD completo |

---

## 💡 Recomendación Final

**Para AWS Learner Lab, usa esta combinación:**

1. **Desarrollo local:** Script PowerShell (`update-backend-ip.ps1`)
2. **Deployment:** GitHub Actions "Simple Deploy"
3. **Hosting:** Vercel (gratis, HTTPS automático)

**Workflow:**
```
Inicio Learner Lab 
  ↓
Actualizar IP localmente (script)
  ↓
Desarrollar y probar
  ↓
Push a GitHub
  ↓
GitHub Actions → Deploy a Vercel
  ↓
✅ Sitio en producción
```

---

## 🔗 Links Útiles

- **GitHub Actions:** `https://github.com/TU-USUARIO/FullSound_React/actions`
- **Vercel Dashboard:** `https://vercel.com/dashboard`
- **AWS Academy:** `https://awsacademy.instructure.com`

