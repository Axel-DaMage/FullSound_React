/**
 * API de Carrito - Gestión del carrito de compras
 */

import api from './api';

/**
 * Obtiene el carrito actual del usuario
 * @returns {Promise<Object>} Carrito con items
 */
export const obtenerCarrito = async () => {
  try {
    const response = await api.get('/carrito');
    return response.data;
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    throw error;
  }
};

/**
 * Agrega un producto al carrito
 * @param {Object} item - Producto a agregar
 * @param {number} item.beatId - ID del beat
 * @param {number} item.cantidad - Cantidad
 * @returns {Promise<Object>} Carrito actualizado
 */
export const agregarAlCarrito = async (item) => {
  try {
    const response = await api.post('/carrito/items', item);
    return response.data;
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    throw error;
  }
};

/**
 * Actualiza la cantidad de un item del carrito
 * @param {number|string} itemId - ID del item
 * @param {number} cantidad - Nueva cantidad
 * @returns {Promise<Object>} Carrito actualizado
 */
export const actualizarCantidadItem = async (itemId, cantidad) => {
  try {
    const response = await api.put(`/carrito/items/${itemId}`, { cantidad });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar cantidad:', error);
    throw error;
  }
};

/**
 * Elimina un item del carrito
 * @param {number|string} itemId - ID del item
 * @returns {Promise<Object>} Carrito actualizado
 */
export const eliminarDelCarrito = async (itemId) => {
  try {
    const response = await api.delete(`/carrito/items/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    throw error;
  }
};

/**
 * Vacía completamente el carrito
 * @returns {Promise<void>}
 */
export const vaciarCarrito = async () => {
  try {
    await api.delete('/carrito');
  } catch (error) {
    console.error('Error al vaciar carrito:', error);
    throw error;
  }
};

/**
 * Procesa el checkout del carrito
 * @param {Object} datosCompra - Datos de la compra
 * @returns {Promise<Object>} Datos de la orden creada
 */
export const procesarCheckout = async (datosCompra) => {
  try {
    const response = await api.post('/carrito/checkout', datosCompra);
    return response.data;
  } catch (error) {
    console.error('Error al procesar checkout:', error);
    throw error;
  }
};
