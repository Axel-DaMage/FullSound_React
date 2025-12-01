/**
 * API de Beats - Endpoints para gestión de beats musicales
 * Conectado al backend Spring Boot + PostgreSQL (Supabase)
 */

import api from './api';

// Función para convertir los datos del backend al formato esperado por el frontend
function transformBeatFromBackend(backendBeat) {
  return {
    id: backendBeat.idBeat || backendBeat.id,
    titulo: backendBeat.titulo,
    artista: backendBeat.artista,
    genero: backendBeat.genero,
    precio: backendBeat.precio, // El backend devuelve precio como Integer (centavos o valor directo)
    precioNumerico: backendBeat.precio,
    descripcion: backendBeat.descripcion,
    imagen: backendBeat.imagenUrl,
    imagenUrl: backendBeat.imagenUrl,
    fuente: backendBeat.audioUrl || backendBeat.audioDemoUrl, // Audio completo o demo
    audio: backendBeat.audioUrl,
    audioUrl: backendBeat.audioUrl,
    audioDemoUrl: backendBeat.audioDemoUrl,
    bpm: backendBeat.bpm,
    tonalidad: backendBeat.tonalidad,
    duracion: backendBeat.duracion,
    estado: backendBeat.estado,
    slug: backendBeat.slug,
    etiquetas: backendBeat.etiquetas,
    reproducciones: backendBeat.reproducciones,
    createdAt: backendBeat.createdAt,
    updatedAt: backendBeat.updatedAt,
    enlaceProducto: `/producto/${backendBeat.idBeat || backendBeat.id}`
  };
}

// Función para convertir del formato frontend al backend
function transformBeatToBackend(frontendBeat) {
  return {
    titulo: frontendBeat.titulo,
    artista: frontendBeat.artista,
    genero: frontendBeat.genero,
    precio: frontendBeat.precioNumerico || frontendBeat.precio,
    descripcion: frontendBeat.descripcion,
    imagenUrl: frontendBeat.imagenUrl || frontendBeat.imagen,
    audioUrl: frontendBeat.audioUrl || frontendBeat.fuente,
    audioDemoUrl: frontendBeat.audioDemoUrl,
    bpm: frontendBeat.bpm || 120,
    tonalidad: frontendBeat.tonalidad || 'C',
    duracion: frontendBeat.duracion || 180,
    estado: frontendBeat.estado || 'DISPONIBLE',
    slug: frontendBeat.slug || frontendBeat.titulo?.toLowerCase().replace(/\s+/g, '-'),
    etiquetas: frontendBeat.etiquetas || ''
  };
}



/**
 * Obtiene todos los beats
 * @param {Object} filters - Filtros opcionales (genero, artista, etc.)
 * @returns {Promise<Array>} Lista de beats
 */
export const obtenerBeats = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/beats${params ? `?${params}` : ''}`);
  console.log('[API] Beats cargados desde la base de datos');
  const beatsTransformados = response.data.map(transformBeatFromBackend);
  return { data: beatsTransformados, source: 'api' };
};

/**
 * Obtiene un beat por ID
 * @param {number|string} id - ID del beat
 * @returns {Promise<Object>} Datos del beat
 */
export const obtenerBeatPorId = async (id) => {
  const response = await api.get(`/beats/${id}`);
  console.log(`[API] Beat ${id} cargado desde la base de datos`);
  const beatTransformado = transformBeatFromBackend(response.data);
  return { data: beatTransformado, source: 'api' };
};

/**
 * Crea un nuevo beat
 * @param {Object} beatData - Datos del beat a crear
 * @returns {Promise<Object>} Beat creado
 */
export const crearBeat = async (beatData) => {
  const backendData = transformBeatToBackend(beatData);
  const response = await api.post('/beats', backendData);
  console.log('[API] Beat creado en la base de datos');
  const beatTransformado = transformBeatFromBackend(response.data);
  return { data: beatTransformado, source: 'api' };
};

/**
 * Actualiza un beat existente
 * @param {number|string} id - ID del beat
 * @param {Object} beatData - Datos actualizados
 * @returns {Promise<Object>} Beat actualizado
 */
export const actualizarBeat = async (id, beatData) => {
  const backendData = transformBeatToBackend(beatData);
  const response = await api.put(`/beats/${id}`, backendData);
  console.log(`[API] Beat ${id} actualizado en la base de datos`);
  const beatTransformado = transformBeatFromBackend(response.data);
  return { data: beatTransformado, source: 'api' };
};

/**
 * Elimina un beat
 * @param {number|string} id - ID del beat
 * @returns {Promise<void>}
 */
export const eliminarBeat = async (id) => {
  await api.delete(`/beats/${id}`);
  console.log(`[API] Beat ${id} eliminado de la base de datos`);
  return { success: true, source: 'api' };
};

/**
 * Obtiene beats por género
 * @param {string} genero - Género musical
 * @returns {Promise<Array>} Lista de beats del género
 */
export const obtenerBeatsPorGenero = async (genero) => {
  // Usar el endpoint de búsqueda con el término del género
  const response = await api.get(`/beats/search?q=${genero}`);
  console.log(`[API] Beats del género ${genero} cargados desde la base de datos`);
  const beatsTransformados = response.data.map(transformBeatFromBackend);
  return { data: beatsTransformados, source: 'api' };
};

/**
 * Obtiene los géneros disponibles
 * @returns {Promise<Array>} Lista de géneros
 */
export const obtenerGeneros = async () => {
  // Obtener todos los beats y extraer géneros únicos
  const response = await api.get('/beats');
  console.log('[API] Géneros cargados desde la base de datos');
  const generosUnicos = [...new Set(response.data.map(b => b.genero).filter(Boolean))];
  return { data: generosUnicos, source: 'api' };
};
