import { datosBeats } from "../utils/datosMusica";

/**
 * Busca un producto por su ID
 * @param {string|number} id - ID del producto a buscar
 * @returns {Object|null} - Producto encontrado o null
 */
export const buscarProductoPorId = (id) => {
  const productoEncontrado = datosBeats.find(
    (beat) => beat.id === Number.parseInt(id)
  );
  return productoEncontrado || datosBeats[0] || null;
};

/**
 * Obtiene productos relacionados por género
 * @param {number} productoId - ID del producto actual
 * @param {string} genero - Género del producto
 * @param {number} limite - Cantidad máxima de productos a retornar
 * @returns {Array} - Array de productos relacionados
 */
export const obtenerProductosRelacionados = (productoId, genero, limite = 3) => {
  return datosBeats
    .filter((beat) => beat.id !== productoId && beat.genero === genero)
    .slice(0, limite);
};

/**
 * Agrega un producto al carrito (simulado)
 * @param {Object} producto - Producto a agregar
 * @param {number} cantidad - Cantidad a agregar
 * @returns {Object} - Resultado de la operación
 */
export const agregarAlCarrito = (producto, cantidad = 1) => {
  // Aquí puedes implementar la lógica real del carrito
  // Por ahora es una simulación
  const mensaje = `"${producto.titulo}" agregado al carrito (${cantidad} unidad${cantidad > 1 ? 'es' : ''})`;
  
  // Podrías guardar en localStorage, Redux, Context, etc.
  // localStorage.setItem('carrito', JSON.stringify(carritoActual));
  
  return {
    success: true,
    mensaje,
    producto,
    cantidad
  };
};

/**
 * Valida la cantidad de un producto
 * @param {number} cantidad - Cantidad a validar
 * @returns {number} - Cantidad válida (mínimo 1)
 */
export const validarCantidad = (cantidad) => {
  const cantidadNumerica = Number.parseInt(cantidad) || 1;
  return Math.max(1, cantidadNumerica);
};
