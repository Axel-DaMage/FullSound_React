/**
 * Configuración de Entorno - FullSound
 * Soporta múltiples backends: Local, AWS EC2, y Supabase
 */

// Detectar el entorno
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Configuración de backends disponibles
export const BACKENDS = {
  LOCAL: 'local',
  AWS: 'aws',
  SUPABASE: 'supabase'
};

// URLs de los backends
const BACKEND_URLS = {
  [BACKENDS.LOCAL]: 'http://localhost:8080/api',
  [BACKENDS.AWS]: import.meta.env.VITE_AWS_BACKEND_URL || 'http://54.227.183.6:8080/api',
  [BACKENDS.SUPABASE]: import.meta.env.VITE_SUPABASE_BACKEND_URL || 'https://kivpcepyhfpqjfoycwel.supabase.co/rest/v1'
};

// Backend activo (configurado por variable de entorno o automático)
const getActiveBackend = () => {
  // 1. Si está definido en variables de entorno, usar ese
  const envBackend = import.meta.env.VITE_ACTIVE_BACKEND;
  if (envBackend && BACKEND_URLS[envBackend]) {
    console.log(`[ENV] Backend configurado desde .env: ${envBackend}`);
    return envBackend;
  }

  // 2. Si hay API_URL definida, úsala directamente
  const customApiUrl = import.meta.env.VITE_API_URL;
  if (customApiUrl) {
    console.log(`[ENV] Usando API_URL personalizada: ${customApiUrl}`);
    return 'custom';
  }

  // 3. Auto-detectar basado en el entorno
  if (isDevelopment) {
    console.log('[ENV] Modo desarrollo: Intentando backend local');
    return BACKENDS.LOCAL;
  }

  // 4. En producción, intentar AWS primero
  console.log('[ENV] Modo producción: Usando backend AWS');
  return BACKENDS.AWS;
};

const activeBackend = getActiveBackend();

// Obtener la URL del backend activo
export const getBackendUrl = () => {
  if (activeBackend === 'custom') {
    return import.meta.env.VITE_API_URL;
  }
  return BACKEND_URLS[activeBackend];
};

// Verificar disponibilidad del backend
export const checkBackendAvailability = async (backendUrl) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch(`${backendUrl}/beats`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.warn(`Backend ${backendUrl} no disponible:`, error.message);
    return false;
  }
};

// Fallback automático entre backends
export const getAvailableBackend = async () => {
  const preferredUrl = getBackendUrl();
  
  console.log(`[ENV] Verificando backend preferido: ${preferredUrl}`);
  
  // Intentar el backend preferido
  const isAvailable = await checkBackendAvailability(preferredUrl);
  if (isAvailable) {
    console.log(`[ENV] ✅ Backend ${activeBackend} disponible`);
    return preferredUrl;
  }

  // Intentar fallbacks en orden
  console.warn(`[ENV] ⚠️ Backend ${activeBackend} no disponible, intentando fallbacks...`);
  
  const fallbackOrder = [BACKENDS.AWS, BACKENDS.LOCAL, BACKENDS.SUPABASE];
  
  for (const backend of fallbackOrder) {
    if (backend === activeBackend) continue; // Ya lo intentamos
    
    const url = BACKEND_URLS[backend];
    console.log(`[ENV] Intentando fallback: ${backend} (${url})`);
    
    const available = await checkBackendAvailability(url);
    if (available) {
      console.log(`[ENV] ✅ Fallback exitoso a ${backend}`);
      return url;
    }
  }

  // Si todo falla, devolver la URL preferida de todos modos
  console.error('[ENV] ❌ Ningún backend disponible, usando configurado por defecto');
  return preferredUrl;
};

// Configuración de Supabase
export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_PROJECT_URL || 'https://kivpcepyhfpqjfoycwel.supabase.co',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  buckets: {
    images: import.meta.env.VITE_SUPABASE_BUCKET_IMAGES || 'Imagenes',
    audio: import.meta.env.VITE_SUPABASE_BUCKET_AUDIO || 'audios'
  }
};

// Generar URL de Supabase Storage
export const getSupabaseUrl = (bucket, path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path; // Ya es una URL completa
  
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${SUPABASE_CONFIG.url}/storage/v1/object/public/${bucket}/${cleanPath}`;
};

// Configuración exportada
export const ENV_CONFIG = {
  isDevelopment,
  isProduction,
  activeBackend,
  backendUrl: getBackendUrl(),
  supabase: SUPABASE_CONFIG,
  appName: import.meta.env.VITE_APP_NAME || 'FullSound'
};

// Log de configuración en desarrollo
if (isDevelopment) {
  console.log('=== FullSound Environment Configuration ===');
  console.log('Mode:', isProduction ? 'Production' : 'Development');
  console.log('Active Backend:', activeBackend);
  console.log('Backend URL:', ENV_CONFIG.backendUrl);
  console.log('Supabase URL:', SUPABASE_CONFIG.url);
  console.log('==========================================');
}

export default ENV_CONFIG;
