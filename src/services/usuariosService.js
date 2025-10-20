/**
 * API de Usuarios - Gestión de perfiles y usuarios
 */

import api from './api';

const USUARIOS_KEY = 'usuarios_locales';

/**
 * Lee usuarios desde localStorage
 */
function readLocalUsuarios() {
  try {
    const raw = localStorage.getItem(USUARIOS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Guarda usuarios en localStorage
 */
function writeLocalUsuarios(usuarios) {
  try {
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
  } catch {}
}

/**
 * Obtiene el perfil del usuario actual
 * @returns {Promise<Object>} Datos del perfil
 */
export const obtenerPerfil = async () => {
  try {
    const response = await api.get('/usuarios/perfil');
    console.log('[API] Perfil cargado desde API');
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log('[LOCAL] Modo local: Cargando perfil desde localStorage');
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    
    if (!user) {
      throw new Error('No hay usuario autenticado');
    }
    
    return { data: user, source: 'local' };
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
    console.log('[API] Perfil actualizado en API');
    // Actualizar localStorage
    localStorage.setItem('user', JSON.stringify(response.data));
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log('[LOCAL] Modo local: Actualizando perfil en localStorage');
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : {};
    const userActualizado = { ...user, ...datosActualizados };
    localStorage.setItem('user', JSON.stringify(userActualizado));
    return { data: userActualizado, source: 'local' };
  }
};

/**
 * Obtiene todos los usuarios (solo admin)
 * @returns {Promise<Array>} Lista de usuarios
 */
export const obtenerUsuarios = async () => {
  try {
    const response = await api.get('/usuarios');
    console.log('[API] Usuarios cargados desde API');
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log('[LOCAL] Modo local: Cargando usuarios desde localStorage');
    const usuarios = readLocalUsuarios();
    return { data: usuarios, source: 'local' };
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
    console.log(`[API] Usuario ${id} cargado desde API`);
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log(`[LOCAL] Modo local: Buscando usuario ${id} en localStorage`);
    const usuarios = readLocalUsuarios();
    const usuario = usuarios.find(u => String(u.id) === String(id));
    
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    
    return { data: usuario, source: 'local' };
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
    console.log(`[API] Usuario ${id} actualizado en API`);
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log(`[LOCAL] Modo local: Actualizando usuario ${id} en localStorage`);
    const usuarios = readLocalUsuarios();
    const index = usuarios.findIndex(u => String(u.id) === String(id));
    
    if (index !== -1) {
      usuarios[index] = { ...usuarios[index], ...datosActualizados };
      writeLocalUsuarios(usuarios);
      return { data: usuarios[index], source: 'local' };
    }
    
    throw new Error('Usuario no encontrado');
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
    console.log(`[API] Usuario ${id} eliminado en API`);
    return { success: true, source: 'api' };
  } catch (error) {
    console.log(`[LOCAL] Modo local: Eliminando usuario ${id} en localStorage`);
    const usuarios = readLocalUsuarios();
    const usuariosFiltrados = usuarios.filter(u => String(u.id) !== String(id));
    writeLocalUsuarios(usuariosFiltrados);
    return { success: true, source: 'local' };
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
    console.log('[API] Contraseña cambiada en API');
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log('[LOCAL] Modo local: Simulando cambio de contraseña');
    return { 
      data: { 
        message: 'Contraseña actualizada exitosamente (simulado)' 
      }, 
      source: 'local' 
    };
  }
};
