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
    console.log('[API] Login exitoso desde API');
    
    // Guardar token en localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log('[LOCAL] Modo local: Simulando login');
    // Modo local - simular login exitoso
    const usuario = {
      id: Date.now(),
      nombre: credentials.correo.split('@')[0],
      correo: credentials.correo,
      rol: credentials.correo.endsWith('@admin.cl') ? 'admin' : 'usuario'
    };
    
    const token = `token_local_${Date.now()}`;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(usuario));
    
    return { 
      data: { user: usuario, token }, 
      source: 'local' 
    };
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
    console.log('[API] Usuario registrado en API');
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log('[LOCAL] Modo local: Simulando registro');
    // Modo local - simular registro exitoso
    const usuario = {
      id: Date.now(),
      nombre: userData.nombre,
      correo: userData.correo,
      rol: userData.correo.endsWith('@admin.cl') ? 'admin' : 'usuario',
      createdAt: new Date().toISOString()
    };
    
    // Guardar en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios_locales') || '[]');
    usuarios.push(usuario);
    localStorage.setItem('usuarios_locales', JSON.stringify(usuarios));
    
    return { 
      data: { user: usuario, message: 'Usuario registrado exitosamente' }, 
      source: 'local' 
    };
  }
};

/**
 * Cierra sesión del usuario
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await api.post('/auth/logout');
    console.log('[API] Logout exitoso en API');
  } catch (error) {
    console.log('[LOCAL] Modo local: Cerrando sesión localmente');
  } finally {
    // Siempre limpiar datos locales
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
    console.log('[API] Token verificado en API');
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log('[LOCAL] Modo local: Verificando token localmente');
    const user = obtenerUsuarioActual();
    const token = localStorage.getItem('token');
    
    if (user && token) {
      return { data: { user, valid: true }, source: 'local' };
    }
    
    // Token inválido - limpiar
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    throw new Error('Token inválido');
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
    console.log('[API] Solicitud de recuperación enviada');
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log('[LOCAL] Modo local: Simulando envío de recuperación');
    return { 
      data: { 
        message: 'Se ha enviado un correo de recuperación (simulado)', 
        email: correo 
      }, 
      source: 'local' 
    };
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
    console.log('[API] Contraseña restablecida en API');
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log('[LOCAL] Modo local: Simulando restablecimiento de contraseña');
    return { 
      data: { 
        message: 'Contraseña restablecida exitosamente (simulado)' 
      }, 
      source: 'local' 
    };
  }
};
