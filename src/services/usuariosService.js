/**
 * API de Usuarios - Gestión de perfiles y usuarios
 * Conectado al backend Spring Boot + PostgreSQL (Supabase)
 */

import api from './api';

/**
 * Obtiene el perfil del usuario actual
 * @returns {Promise<Object>} Datos del perfil
 */
export const obtenerPerfil = async () => {
  const response = await api.get('/usuarios/me');
  console.log('[API] Perfil cargado desde la base de datos');
  
  // Transformar respuesta del backend al formato del frontend
  return {
    data: {
      id: response.data.id,
      nombre: response.data.nombreUsuario,
      correo: response.data.correo,
      activo: response.data.activo,
      rol: response.data.roles?.[0] || 'cliente',
      roles: response.data.roles,
      createdAt: response.data.createdAt
    },
    source: 'api'
  };
};

/**
 * Actualiza el perfil del usuario
 * @param {Object} datosActualizados - Datos a actualizar
 * @returns {Promise<Object>} Perfil actualizado
 */
export const actualizarPerfil = async (datosActualizados) => {
  // Transformar datos al formato esperado por el backend
  const updateData = {
    nombreUsuario: datosActualizados.nombre || datosActualizados.nombreUsuario,
    correo: datosActualizados.correo,
    contraseña: datosActualizados.contraseña
  };
  
  const response = await api.put('/usuarios/me', updateData);
  console.log('[API] Perfil actualizado en la base de datos');
  
  // Actualizar localStorage con los datos actualizados
  const user = {
    id: response.data.id,
    nombre: response.data.nombreUsuario,
    correo: response.data.correo,
    activo: response.data.activo,
    rol: response.data.roles?.[0] || 'cliente',
    roles: response.data.roles
  };
  localStorage.setItem('user', JSON.stringify(user));
  
  return { data: user, source: 'api' };
};

/**
 * Obtiene todos los usuarios (solo admin)
 * @returns {Promise<Array>} Lista de usuarios
 */
export const obtenerUsuarios = async () => {
  const response = await api.get('/usuarios');
  console.log('[API] Usuarios cargados desde la base de datos');
  console.log('[API] Respuesta completa:', response.data);
  
  // Transformar respuesta al formato del frontend
  const usuarios = response.data.map(u => {
    console.log('[API] Mapeando usuario:', u);
    return {
      id: u.id,
      nombreUsuario: u.nombreUsuario, // Agregar este campo
      nombre: u.nombreUsuario,
      apellido: u.apellido || '', // Agregar apellido
      correo: u.correo,
      activo: u.activo,
      rol: u.roles?.[0] || 'cliente',
      roles: u.roles,
      createdAt: u.createdAt
    };
  });
  
  console.log('[API] Usuarios transformados:', usuarios);
  return { data: usuarios, source: 'api' };
};

/**
 * Obtiene un usuario por ID (solo admin)
 * @param {number|string} id - ID del usuario
 * @returns {Promise<Object>} Datos del usuario
 */
export const obtenerUsuarioPorId = async (id) => {
  const response = await api.get(`/usuarios/${id}`);
  console.log(`[API] Usuario ${id} cargado desde la base de datos`);
  
  // Transformar respuesta al formato del frontend
  return {
    data: {
      id: response.data.id,
      nombreUsuario: response.data.nombreUsuario,
      nombre: response.data.nombreUsuario,
      apellido: response.data.apellido || '',
      correo: response.data.correo,
      activo: response.data.activo,
      rol: response.data.roles?.[0] || 'cliente',
      roles: response.data.roles,
      createdAt: response.data.createdAt
    },
    source: 'api'
  };
};

/**
 * Actualiza un usuario (solo admin)
 * @param {number|string} id - ID del usuario
 * @param {Object} datosActualizados - Datos a actualizar
 * @returns {Promise<Object>} Usuario actualizado
 */
export const actualizarUsuario = async (id, datosActualizados) => {
  // Transformar datos al formato esperado por el backend
  const updateData = {
    nombreUsuario: datosActualizados.nombre || datosActualizados.nombreUsuario,
    correo: datosActualizados.correo,
    contraseña: datosActualizados.contraseña,
    activo: datosActualizados.activo
  };
  
  const response = await api.put(`/usuarios/${id}`, updateData);
  console.log(`[API] Usuario ${id} actualizado en la base de datos`);
  
  // Transformar respuesta al formato del frontend
  return {
    data: {
      id: response.data.id,
      nombre: response.data.nombreUsuario,
      correo: response.data.correo,
      activo: response.data.activo,
      rol: response.data.roles?.[0] || 'cliente',
      roles: response.data.roles
    },
    source: 'api'
  };
};

/**
 * Elimina (desactiva) un usuario (solo admin)
 * @param {number|string} id - ID del usuario
 * @returns {Promise<Object>}
 */
export const eliminarUsuario = async (id) => {
  console.log(`[API] Eliminando usuario con ID: ${id}`);
  console.log(`[API] URL completa: /usuarios/${id}`);
  
  const response = await api.delete(`/usuarios/${id}`);
  console.log(`[API] Usuario ${id} desactivado en la base de datos`);
  console.log(`[API] Respuesta del servidor:`, response.data);
  
  return { success: true, source: 'api' };
};

/**
 * Cambia la contraseña del usuario actual
 * @param {string} passwordActual - Contraseña actual
 * @param {string} passwordNueva - Nueva contraseña
 * @returns {Promise<Object>}
 */
export const cambiarPassword = async (passwordActual, passwordNueva) => {
  const response = await api.post('/usuarios/cambiar-password', {
    passwordActual,
    passwordNueva,
  });
  console.log('[API] Contraseña actualizada en la base de datos');
  return { data: response.data, source: 'api' };
};
