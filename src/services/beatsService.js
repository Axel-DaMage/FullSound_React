/**
 * API de Beats - Endpoints para gestión de beats musicales
 */

import api from './api';
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
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/beats${params ? `?${params}` : ''}`);
    console.log('[API] Beats cargados desde API');
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log('[LOCAL] Modo local: Cargando beats desde localStorage');
    let beats = readLocalBeats();
    // Aplicar filtros si existen
    if (filters.genero) {
      beats = beats.filter(b => b.genero === filters.genero);
    }
    if (filters.artista) {
      beats = beats.filter(b => b.artista === filters.artista);
    }
    return { data: beats, source: 'local' };
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
    console.log(`[API] Beat ${id} cargado desde API`);
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log(`[LOCAL] Modo local: Buscando beat ${id} en localStorage`);
    const beats = readLocalBeats();
    const beat = beats.find(b => String(b.id) === String(id));
    if (!beat) throw new Error('Beat no encontrado');
    return { data: beat, source: 'local' };
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
    console.log('[API] Beat creado en API');
    // Sincronizar con localStorage
    const beats = readLocalBeats();
    beats.push(response.data);
    writeLocalBeats(beats);
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log('[LOCAL] Modo local: Creando beat en localStorage');
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
    return { data: beatFinal, source: 'local' };
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
    console.log(`[API] Beat ${id} actualizado en API`);
    // Sincronizar con localStorage
    let beats = readLocalBeats();
    beats = beats.map(b => String(b.id) === String(id) ? { ...b, ...response.data } : b);
    writeLocalBeats(beats);
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log(`[LOCAL] Modo local: Actualizando beat ${id} en localStorage`);
    let beats = readLocalBeats();
    beats = beats.map(b => String(b.id) === String(id) ? { ...b, ...beatData } : b);
    writeLocalBeats(beats);
    return { data: { id, ...beatData }, source: 'local' };
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
    console.log(`[API] Beat ${id} eliminado en API`);
    // Sincronizar con localStorage
    let beats = readLocalBeats();
    beats = beats.filter(b => String(b.id) !== String(id));
    writeLocalBeats(beats);
    return { success: true, source: 'api' };
  } catch (error) {
    console.log(`[LOCAL] Modo local: Eliminando beat ${id} en localStorage`);
    let beats = readLocalBeats();
    beats = beats.filter(b => String(b.id) !== String(id));
    writeLocalBeats(beats);
    return { success: true, source: 'local' };
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
    console.log(`[API] Beats del género ${genero} cargados desde API`);
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log(`[LOCAL] Modo local: Filtrando beats por género ${genero}`);
    const beats = readLocalBeats();
    const beatsFiltrados = beats.filter(b => b.genero === genero);
    return { data: beatsFiltrados, source: 'local' };
  }
};

/**
 * Obtiene los géneros disponibles
 * @returns {Promise<Array>} Lista de géneros
 */
export const obtenerGeneros = async () => {
  try {
    const response = await api.get('/generos');
    console.log('[API] Géneros cargados desde API');
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log('[LOCAL] Modo local: Usando géneros predeterminados');
    const beats = readLocalBeats();
    // Extraer géneros únicos de los beats locales
    const generosUnicos = [...new Set(beats.map(b => b.genero))];
    return { data: generosUnicos, source: 'local' };
  }
};
