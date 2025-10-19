/**
 * Configuración de Axios para consumo de APIs
 * Archivo base para comunicación con el backend
 */

import axios from 'axios';

// URL base del backend - ajustar según el entorno
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Instancia de axios configurada
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
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
  (response) => response,
  (error) => {
    if (error.response) {
      // Error con respuesta del servidor
      switch (error.response.status) {
        case 401:
          // Token expirado o inválido
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Acceso denegado');
          break;
        case 404:
          console.error('Recurso no encontrado');
          break;
        case 500:
          console.error('Error del servidor');
          break;
        default:
          console.error('Error en la petición:', error.response.data);
      }
    } else if (error.request) {
      // No hubo respuesta del servidor
      console.error('No se recibió respuesta del servidor');
    } else {
      // Error al configurar la petición
      console.error('Error al configurar la petición:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
