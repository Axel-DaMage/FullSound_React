/**
 * API de Autenticación - Login, Registro y gestión de sesión
 * Conectado al backend Spring Boot + PostgreSQL (Supabase)
 */

import api from './api';

/**
 * Dispara un evento personalizado para notificar cambios en el usuario
 */
const notificarCambioUsuario = () => {
  window.dispatchEvent(new CustomEvent('usuarioActualizado'));
};

/**
 * Inicia sesión de usuario
 * @param {Object} credentials - Credenciales de usuario
 * @param {string} credentials.nombreUsuario - Nombre de usuario o correo
 * @param {string} credentials.contraseña - Contraseña
 * @returns {Promise<Object>} Datos del usuario y token
 */
export const login = async (credentials) => {
  // El backend espera: { nombreUsuario, contraseña }
  const loginData = {
    nombreUsuario: credentials.nombreUsuario || credentials.correo || credentials.email,
    contraseña: credentials.contraseña || credentials.password
  };
  
  const response = await api.post('/auth/login', loginData);
  console.log('[API] Login exitoso desde la base de datos');
  
  // Respuesta del backend: { token, tipo, usuarioId, nombreUsuario, correo, roles }
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    
    // Transformar la respuesta al formato esperado por el frontend
    const rolBackend = response.data.roles?.[0] || 'cliente';
    const user = {
      id: response.data.usuarioId,
      nombre: response.data.nombreUsuario,
      correo: response.data.correo,
      rol: rolBackend, // Mantener el rol original del backend
      roles: response.data.roles
    };
    
    console.log('[API] Usuario autenticado:', { ...user, contraseña: '[OCULTA]' });
    localStorage.setItem('user', JSON.stringify(user));
    notificarCambioUsuario();
    
    return { data: { user, token: response.data.token }, source: 'api' };
  }
  
  return { data: response.data, source: 'api' };
};

/**
 * Registra un nuevo usuario
 * @param {Object} userData - Datos del usuario
 * @param {string} userData.nombreUsuario - Nombre de usuario
 * @param {string} userData.correo - Correo electrónico
 * @param {string} userData.contraseña - Contraseña
 * @returns {Promise<Object>} Usuario creado
 */
export const registrar = async (userData) => {
  // El backend espera: { nombreUsuario, correo, contraseña, rol (opcional), nombre, apellido, rut }
  const registerData = {
    nombreUsuario: userData.nombreUsuario || userData.nombre || userData.correo?.split('@')[0],
    rut: userData.rut,
    correo: userData.correo || userData.email,
    contraseña: userData.contraseña || userData.password,
    rol: userData.rol, // Rol opcional para especificar tipo de usuario
    nombre: userData.nombre,
    apellido: userData.apellido
  };
  
  console.log('[API] Datos de registro enviados:', { ...registerData, contraseña: '[OCULTA]' });
  
  const response = await api.post('/auth/register', registerData);
  console.log('[API] Usuario registrado en la base de datos');
  
  // Respuesta del backend: { message, success }
  return { data: response.data, source: 'api' };
};

/**
 * Cierra sesión del usuario
 * @returns {Promise<void>}
 */
export const logout = async () => {
  // Limpiar datos locales
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  notificarCambioUsuario();
  console.log('[API] Sesión cerrada');
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
  const user = obtenerUsuarioActual();
  const token = localStorage.getItem('token');
  
  if (user && token) {
    return { data: { user, valid: true }, source: 'local' };
  }
  
  // Token inválido - limpiar
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  throw new Error('Token inválido');
};

/**
 * Solicita recuperación de contraseña
 * @param {string} correo - Correo electrónico
 * @returns {Promise<Object>}
 */
export const recuperarPassword = async (correo) => {
  const response = await api.post('/auth/forgot-password', { correo });
  console.log('[API] Solicitud de recuperación enviada');
  return { data: response.data, source: 'api' };
};

/**
 * Restablece la contraseña con token
 * @param {string} token - Token de recuperación
 * @param {string} nuevaPassword - Nueva contraseña
 * @returns {Promise<Object>}
 */
export const restablecerPassword = async (token, nuevaPassword) => {
  const response = await api.post('/auth/reset-password', {
    token,
    password: nuevaPassword,
  });
  console.log('[API] Contraseña restablecida en la base de datos');
  return { data: response.data, source: 'api' };
};
