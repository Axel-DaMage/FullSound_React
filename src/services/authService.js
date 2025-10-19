/**
 * API de Autenticación - Login, Registro y gestión de sesión
 */

import api from './api';

/**
 * Inicia sesión de usuario
 * @param {Object} credentials - Credenciales de usuario
 * @param {string} credentials.correo - Correo electrónico
 * @param {string} credentials.password - Contraseña
 * @returns {Promise<Object>} Datos del usuario y token
 */
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    
    // Guardar token en localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

/**
 * Registra un nuevo usuario
 * @param {Object} userData - Datos del usuario
 * @param {string} userData.nombre - Nombre completo
 * @param {string} userData.correo - Correo electrónico
 * @param {string} userData.password - Contraseña
 * @returns {Promise<Object>} Usuario creado
 */
export const registrar = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

/**
 * Cierra sesión del usuario
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    // Limpiar datos locales aunque falle la petición
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    throw error;
  }
};

/**
 * Verifica si el usuario está autenticado
 * @returns {boolean}
 */
export const estaAutenticado = () => {
  return !!localStorage.getItem('token');
};

/**
 * Obtiene el usuario actual del localStorage
 * @returns {Object|null} Datos del usuario o null
 */
export const obtenerUsuarioActual = () => {
  const userString = localStorage.getItem('user');
  return userString ? JSON.parse(userString) : null;
};

/**
 * Verifica el token actual con el servidor
 * @returns {Promise<Object>} Datos del usuario
 */
export const verificarToken = async () => {
  try {
    const response = await api.get('/auth/verify');
    return response.data;
  } catch (error) {
    console.error('Error al verificar token:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    throw error;
  }
};

/**
 * Solicita recuperación de contraseña
 * @param {string} correo - Correo electrónico
 * @returns {Promise<Object>}
 */
export const recuperarPassword = async (correo) => {
  try {
    const response = await api.post('/auth/forgot-password', { correo });
    return response.data;
  } catch (error) {
    console.error('Error al solicitar recuperación:', error);
    throw error;
  }
};

/**
 * Restablece la contraseña con token
 * @param {string} token - Token de recuperación
 * @param {string} nuevaPassword - Nueva contraseña
 * @returns {Promise<Object>}
 */
export const restablecerPassword = async (token, nuevaPassword) => {
  try {
    const response = await api.post('/auth/reset-password', {
      token,
      password: nuevaPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    throw error;
  }
};
