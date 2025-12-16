/**
 * Configuración de Entorno - FullSound
 * En PRODUCCIÓN: El frontend se sirve desde el mismo backend Spring Boot en AWS
 * En DESARROLLO: El frontend se conecta a localhost:8080
 */

// Detectar el entorno
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Configuración de backends disponibles
export const BACKENDS = {
  LOCAL: 'local',
  PRODUCTION: 'production', // Frontend servido por Spring Boot
  SUPABASE: 'supabase'
};

// URLs de los backends
const BACKEND_URLS = {
  [BACKENDS.LOCAL]: 'http://localhost:8080/api',
  [BACKENDS.PRODUCTION]: '/api', // Ruta relativa - mismo servidor
  [BACKENDS.SUPABASE]: import.meta.env.VITE_SUPABASE_BACKEND_URL || 'https://kivpcepyhfpqjfoycwel.supabase.co/rest/v1'
};

// Backend activo (configurado por variable de entorno o automático)
const getActiveBackend = () => {
  // Verificar si hay una configuración explícita
  const configuredBackend = import.meta.env.VITE_ACTIVE_BACKEND;
  
  // Si está configurado para usar AWS, usar URL de AWS
  if (configuredBackend === 'aws' && import.meta.env.VITE_API_URL) {
    console.log('[ENV] Usando backend AWS configurado:', import.meta.env.VITE_API_URL);
    return 'aws';
  }
  
  // En desarrollo, usar backend local por defecto
  if (isDevelopment) {
    console.log('[ENV] Modo desarrollo: Usando backend configurado');
    return BACKENDS.LOCAL;
  }

  // En producción, el frontend está servido por Spring Boot, usar ruta relativa
  console.log('[ENV] Modo producción: Usando rutas relativas (frontend servido por Spring Boot)');
  return BACKENDS.PRODUCTION;
};

const activeBackend = getActiveBackend();

// Obtener la URL del backend activo
export const getBackendUrl = () => {
  // Si está configurado para AWS, usar la URL de AWS
  if (activeBackend === 'aws' && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return BACKEND_URLS[activeBackend];
};

// Verificar disponibilidad del backend (solo para desarrollo)
export const checkBackendAvailability = async (backendUrl) => {
  // En producción no es necesario verificar (mismo servidor)
  if (isProduction) {
    return true;
  }
  
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

// Obtener backend disponible (en producción siempre retorna la ruta configurada)
export const getAvailableBackend = async () => {
  const preferredUrl = getBackendUrl();
  
  // En producción, el backend siempre está disponible (mismo servidor)
  if (isProduction) {
    console.log('[ENV] ✅ Producción: Backend en el mismo servidor');
    return preferredUrl;
  }
  
  console.log(`[ENV] Verificando backend de desarrollo: ${preferredUrl}`);
  
  // Verificar disponibilidad en desarrollo
  const isAvailable = await checkBackendAvailability(preferredUrl);
  if (isAvailable) {
    console.log('[ENV] ✅ Backend de desarrollo disponible');
    return preferredUrl;
  }

  console.error('[ENV] ❌ Backend de desarrollo no disponible');
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
