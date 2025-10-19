/**
 * API de Usuarios - Gestión de perfiles y usuarios
 */

import api from './api';

/**
 * Obtiene el perfil del usuario actual
 * @returns {Promise<Object>} Datos del perfil
 */
export const obtenerPerfil = async () => {
  try {
    const response = await api.get('/usuarios/perfil');
    return response.data;
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    throw error;
  }
};

/**
 * Actualiza el perfil del usuario
 * @param {Object} datosActualizados - Datos a actualizar
 * @returns {Promise<Object>} Perfil actualizado
 */
export const actualizarPerfil = async (datosActualizados) => {
  try {
    const response = await api.put('/usuarios/perfil', datosActualizados);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    throw error;
  }
};

/**
 * Obtiene todos los usuarios (solo admin)
 * @returns {Promise<Array>} Lista de usuarios
 */
export const obtenerUsuarios = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

/**
 * Obtiene un usuario por ID (solo admin)
 * @param {number|string} id - ID del usuario
 * @returns {Promise<Object>} Datos del usuario
 */
export const obtenerUsuarioPorId = async (id) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener usuario ${id}:`, error);
    throw error;
  }
};

/**
 * Actualiza un usuario (solo admin)
 * @param {number|string} id - ID del usuario
 * @param {Object} datosActualizados - Datos a actualizar
 * @returns {Promise<Object>} Usuario actualizado
 */
export const actualizarUsuario = async (id, datosActualizados) => {
  try {
    const response = await api.put(`/usuarios/${id}`, datosActualizados);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario ${id}:`, error);
    throw error;
  }
};

/**
 * Elimina un usuario (solo admin)
 * @param {number|string} id - ID del usuario
 * @returns {Promise<void>}
 */
export const eliminarUsuario = async (id) => {
  try {
    await api.delete(`/usuarios/${id}`);
  } catch (error) {
    console.error(`Error al eliminar usuario ${id}:`, error);
    throw error;
  }
};

/**
 * Cambia la contraseña del usuario actual
 * @param {string} passwordActual - Contraseña actual
 * @param {string} passwordNueva - Nueva contraseña
 * @returns {Promise<Object>}
 */
export const cambiarPassword = async (passwordActual, passwordNueva) => {
  try {
    const response = await api.post('/usuarios/cambiar-password', {
      passwordActual,
      passwordNueva,
    });
    return response.data;
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    throw error;
  }
};
