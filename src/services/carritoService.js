/**
 * API de Carrito - Gestión del carrito de compras
 */

import api from './api';

const CARRITO_KEY = 'fs_carrito_local';

/**
 * Lee el carrito desde localStorage
 */
function readLocalCarrito() {
  try {
    const raw = localStorage.getItem(CARRITO_KEY);
    return raw ? JSON.parse(raw) : { items: [], total: 0 };
  } catch {
    return { items: [], total: 0 };
  }
}

/**
 * Guarda el carrito en localStorage
 */
function writeLocalCarrito(carrito) {
  try {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
  } catch {}
}

/**
 * Calcula el total del carrito
 */
function calcularTotal(items) {
  return items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
}

/**
 * Obtiene el carrito actual del usuario
 * @returns {Promise<Object>} Carrito con items
 */
export const obtenerCarrito = async () => {
  try {
    const response = await api.get('/carrito');
    console.log('[API] Carrito cargado desde API');
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log('[LOCAL] Modo local: Cargando carrito desde localStorage');
    return { data: readLocalCarrito(), source: 'local' };
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
    console.log('[API] Item agregado al carrito en API');
    // Sincronizar con localStorage
    writeLocalCarrito(response.data);
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log('[LOCAL] Modo local: Agregando item al carrito local');
    const carrito = readLocalCarrito();
    const existente = carrito.items.find(i => i.beatId === item.beatId);
    
    if (existente) {
      existente.cantidad += item.cantidad;
    } else {
      carrito.items.push({ ...item, id: Date.now() });
    }
    
    carrito.total = calcularTotal(carrito.items);
    writeLocalCarrito(carrito);
    return { data: carrito, source: 'local' };
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
    console.log('[API] Cantidad actualizada en API');
    writeLocalCarrito(response.data);
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log('[LOCAL] Modo local: Actualizando cantidad en carrito local');
    const carrito = readLocalCarrito();
    const item = carrito.items.find(i => String(i.id) === String(itemId));
    
    if (item) {
      item.cantidad = cantidad;
      carrito.total = calcularTotal(carrito.items);
      writeLocalCarrito(carrito);
    }
    
    return { data: carrito, source: 'local' };
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
    console.log('[API] Item eliminado del carrito en API');
    writeLocalCarrito(response.data);
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log('[LOCAL] Modo local: Eliminando item del carrito local');
    const carrito = readLocalCarrito();
    carrito.items = carrito.items.filter(i => String(i.id) !== String(itemId));
    carrito.total = calcularTotal(carrito.items);
    writeLocalCarrito(carrito);
    return { data: carrito, source: 'local' };
  }
};

/**
 * Vacía completamente el carrito
 * @returns {Promise<void>}
 */
export const vaciarCarrito = async () => {
  try {
    await api.delete('/carrito');
    console.log('[API] Carrito vaciado en API');
  } catch (error) {
    console.log('[LOCAL] Modo local: Vaciando carrito local');
  } finally {
    writeLocalCarrito({ items: [], total: 0 });
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
    console.log('[API] Checkout procesado en API');
    // Vaciar carrito después del checkout
    writeLocalCarrito({ items: [], total: 0 });
    return { data: response.data, source: 'api' };
  } catch (error) {
    console.log('[LOCAL] Modo local: Simulando checkout');
    const carrito = readLocalCarrito();
    const orden = {
      id: Date.now(),
      items: carrito.items,
      total: carrito.total,
      datosCompra,
      fecha: new Date().toISOString(),
      estado: 'pendiente'
    };
    
    // Guardar orden en localStorage
    const ordenes = JSON.parse(localStorage.getItem('ordenes_locales') || '[]');
    ordenes.push(orden);
    localStorage.setItem('ordenes_locales', JSON.stringify(ordenes));
    
    // Vaciar carrito
    writeLocalCarrito({ items: [], total: 0 });
    
    return { data: orden, source: 'local' };
  }
};
