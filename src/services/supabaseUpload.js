/**
 * Servicio para subir archivos a Supabase Storage
 */

import { SUPABASE_CONFIG } from '../config/environment';

const SUPABASE_URL = SUPABASE_CONFIG.url;
const SUPABASE_ANON_KEY = SUPABASE_CONFIG.anonKey;

/**
 * Sube un archivo a Supabase Storage
 * @param {File} file - Archivo a subir
 * @param {string} bucket - Nombre del bucket ('Imagenes' o 'audios')
 * @param {string} filename - Nombre personalizado (opcional)
 * @returns {Promise<Object>} URL pública del archivo subido
 */
export const uploadFileToSupabase = async (file, bucket, filename = null) => {
  if (!file) {
    throw new Error('No se proporcionó ningún archivo');
  }

  if (!SUPABASE_ANON_KEY) {
    throw new Error('SUPABASE_ANON_KEY no está configurado. Verifica tu archivo .env');
  }

  // Generar nombre único si no se proporciona
  const finalFilename = filename || `${Date.now()}_${file.name}`;
  
  // Construir la URL para subir el archivo
  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${bucket}/${finalFilename}`;

  try {
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': file.type,
      },
      body: file
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al subir el archivo');
    }

    // Retornar solo el nombre del archivo (sin la URL completa)
    // El frontend construirá la URL completa usando getSupabaseUrl
    return {
      success: true,
      filename: finalFilename,
      publicUrl: `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${finalFilename}`
    };
  } catch (error) {
    console.error('Error subiendo archivo a Supabase:', error);
    throw error;
  }
};

/**
 * Sube una imagen a Supabase
 * @param {File} file - Archivo de imagen
 * @param {string} customName - Nombre personalizado (opcional)
 * @returns {Promise<string>} Nombre del archivo en Supabase
 */
export const uploadImage = async (file, customName = null) => {
  const result = await uploadFileToSupabase(file, SUPABASE_CONFIG.buckets.images, customName);
  return result.filename;
};

/**
 * Sube un archivo de audio a Supabase
 * @param {File} file - Archivo de audio
 * @param {string} customName - Nombre personalizado (opcional)
 * @returns {Promise<string>} Nombre del archivo en Supabase
 */
export const uploadAudio = async (file, customName = null) => {
  const result = await uploadFileToSupabase(file, SUPABASE_CONFIG.buckets.audio, customName);
  return result.filename;
};

/**
 * Elimina un archivo de Supabase Storage
 * @param {string} bucket - Nombre del bucket
 * @param {string} filename - Nombre del archivo a eliminar
 * @returns {Promise<boolean>} True si se eliminó correctamente
 */
export const deleteFileFromSupabase = async (bucket, filename) => {
  if (!SUPABASE_ANON_KEY) {
    throw new Error('SUPABASE_ANON_KEY no está configurado');
  }

  const deleteUrl = `${SUPABASE_URL}/storage/v1/object/${bucket}/${filename}`;

  try {
    const response = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al eliminar el archivo');
    }

    return true;
  } catch (error) {
    console.error('Error eliminando archivo de Supabase:', error);
    throw error;
  }
};

/**
 * Valida el tipo de archivo de imagen
 * @param {File} file - Archivo a validar
 * @returns {boolean} True si es una imagen válida
 */
export const isValidImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return file && validTypes.includes(file.type);
};

/**
 * Valida el tipo de archivo de audio
 * @param {File} file - Archivo a validar
 * @returns {boolean} True si es un audio válido
 */
export const isValidAudioFile = (file) => {
  const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg'];
  return file && validTypes.includes(file.type);
};

/**
 * Valida el tamaño del archivo (max 50MB para imágenes, 200MB para audio)
 * @param {File} file - Archivo a validar
 * @param {string} type - Tipo ('image' o 'audio')
 * @returns {boolean} True si el tamaño es válido
 */
export const isValidFileSize = (file, type = 'image') => {
  const maxSize = type === 'image' ? 50 * 1024 * 1024 : 200 * 1024 * 1024; // 50MB o 200MB
  return file && file.size <= maxSize;
};
