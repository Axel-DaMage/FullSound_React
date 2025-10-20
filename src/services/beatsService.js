/**
 * API de Beats - Endpoints para gestión de beats musicales
 */

import { datosBeats } from '../utils/datosMusica';

const STORAGE_KEY = 'fs_beats_local';

function readLocalBeats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let beats = raw ? JSON.parse(raw) : [...datosBeats];
    // Asegura que los beats estáticos tengan precio numérico
    beats = beats.map(b => {
      if (b.precioNumerico !== undefined) {
        return { ...b, precio: b.precioNumerico };
      }
      return b;
    });
    return beats;
  } catch {
    // Si hay error, retorna los beats estáticos con precio numérico
    return [...datosBeats].map(b => ({ ...b, precio: b.precioNumerico !== undefined ? b.precioNumerico : b.precio }));
  }
}

function writeLocalBeats(beats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(beats));
  } catch {}
}
/**
 * Obtiene todos los beats
 * @param {Object} filters - Filtros opcionales (genero, artista, etc.)
 * @returns {Promise<Array>} Lista de beats
 */
export const obtenerBeats = async (filters = {}) => {
  let beats = readLocalBeats();
  // Filtros opcionales
  if (filters.genero) {
    beats = beats.filter(b => b.genero === filters.genero);
  }
  if (filters.artista) {
    beats = beats.filter(b => b.artista === filters.artista);
  }
  return { data: beats };
};

/**
 * Obtiene un beat por ID
 * @param {number|string} id - ID del beat
 * @returns {Promise<Object>} Datos del beat
 */
export const obtenerBeatPorId = async (id) => {
  const beats = readLocalBeats();
  const beat = beats.find(b => String(b.id) === String(id));
  if (!beat) throw new Error('Beat no encontrado');
  return beat;
};

/**
 * Crea un nuevo beat
 * @param {Object} beatData - Datos del beat a crear
 * @returns {Promise<Object>} Beat creado
 */
export const crearBeat = async (beatData) => {
  const beats = readLocalBeats();
  // Encuentra el id máximo actual
  const maxId = beats.reduce((max, b) => {
    const idNum = typeof b.id === 'number' ? b.id : parseInt(b.id, 10);
    return idNum > max ? idNum : max;
  }, 0);
  const newId = maxId + 1;
  // Asegura que el precio sea numérico
  let precioNum = beatData.precio;
  if (typeof precioNum === 'string') {
    precioNum = parseFloat(precioNum.replace(/[^\d.]/g, ''));
    if (isNaN(precioNum)) precioNum = 0;
  }
  const beatFinal = { ...beatData, id: newId, precio: precioNum, precioNumerico: precioNum };
  beats.push(beatFinal);
  writeLocalBeats(beats);
  return beatFinal;
};

/**
 * Actualiza un beat existente
 * @param {number|string} id - ID del beat
 * @param {Object} beatData - Datos actualizados
 * @returns {Promise<Object>} Beat actualizado
 */
export const actualizarBeat = async (id, beatData) => {
  let beats = readLocalBeats();
  beats = beats.map(b => String(b.id) === String(id) ? { ...b, ...beatData } : b);
  writeLocalBeats(beats);
  return beatData;
};

/**
 * Elimina un beat
 * @param {number|string} id - ID del beat
 * @returns {Promise<void>}
 */
export const eliminarBeat = async (id) => {
  let beats = readLocalBeats();
  beats = beats.filter(b => String(b.id) !== String(id));
  writeLocalBeats(beats);
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
