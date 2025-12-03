/**
 * Configuración de Axios para consumo de APIs
 * Archivo base para comunicación con el backend
 * Soporta: Local Spring Boot, AWS EC2, y Supabase
 */

import axios from 'axios';
import { getAvailableBackend } from '../config/environment';

// URL base del backend - ajustar según el entorno
const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8080/api' : '/api');

// Instancia de axios configurada
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Aumentado a 30 segundos para consultas a base de datos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitudes - agregar token si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas - manejo de errores global
api.interceptors.response.use(
  (response) => {
    // Log de éxito en modo desarrollo
    if (import.meta.env.DEV) {
      console.log(`[API] ${response.config.method?.toUpperCase()} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      // Error con respuesta del servidor
      switch (error.response.status) {
        case 401:
          // Token expirado o inválido - solo redirigir si no es token simulado
          const token = localStorage.getItem('token');
          if (token && !token.startsWith('token_local_')) {
            console.warn('[WARNING] Token expirado, redirigiendo a login...');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }
          break;
        case 403:
          console.warn('[WARNING] Acceso denegado');
          break;
        case 404:
          console.log('[INFO] Recurso no encontrado en API, usando fallback local');
          break;
        case 500:
          console.error('[ERROR] Error del servidor');
          break;
        default:
          console.warn(`[WARNING] Error en la petición: ${error.response.status}`);
      }
    } else if (error.request) {
      // No hubo respuesta del servidor - modo local
      console.log('[LOCAL] Servidor no disponible, usando modo local');
    } else {
      // Error al configurar la petición
      console.error('[ERROR] Error al configurar la petición:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
