/**
 * API de Beats - Endpoints para gestión de beats musicales
 */

import api from './api';

/**
 * Obtiene todos los beats
 * @param {Object} filters - Filtros opcionales (genero, artista, etc.)
 * @returns {Promise<Array>} Lista de beats
 */
export const obtenerBeats = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/beats${params ? `?${params}` : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener beats:', error);
    throw error;
  }
};

/**
 * Obtiene un beat por ID
 * @param {number|string} id - ID del beat
 * @returns {Promise<Object>} Datos del beat
 */
export const obtenerBeatPorId = async (id) => {
  try {
    const response = await api.get(`/beats/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener beat ${id}:`, error);
    throw error;
  }
};

/**
 * Crea un nuevo beat
 * @param {Object} beatData - Datos del beat a crear
 * @returns {Promise<Object>} Beat creado
 */
export const crearBeat = async (beatData) => {
  try {
    const response = await api.post('/beats', beatData);
    return response.data;
  } catch (error) {
    console.error('Error al crear beat:', error);
    throw error;
  }
};

/**
 * Actualiza un beat existente
 * @param {number|string} id - ID del beat
 * @param {Object} beatData - Datos actualizados
 * @returns {Promise<Object>} Beat actualizado
 */
export const actualizarBeat = async (id, beatData) => {
  try {
    const response = await api.put(`/beats/${id}`, beatData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar beat ${id}:`, error);
    throw error;
  }
};

/**
 * Elimina un beat
 * @param {number|string} id - ID del beat
 * @returns {Promise<void>}
 */
export const eliminarBeat = async (id) => {
  try {
    await api.delete(`/beats/${id}`);
  } catch (error) {
    console.error(`Error al eliminar beat ${id}:`, error);
    throw error;
  }
};

/**
 * Obtiene beats por género
 * @param {string} genero - Género musical
 * @returns {Promise<Array>} Lista de beats del género
 */
export const obtenerBeatsPorGenero = async (genero) => {
  try {
    const response = await api.get(`/beats?genero=${genero}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener beats del género ${genero}:`, error);
    throw error;
  }
};

/**
 * Obtiene los géneros disponibles
 * @returns {Promise<Array>} Lista de géneros
 */
export const obtenerGeneros = async () => {
  try {
    const response = await api.get('/generos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener géneros:', error);
    throw error;
  }
};
