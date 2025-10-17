/**
 * Utilidades para el componente Header
 */

/**
 * Define los elementos del menú principal
 */
export const menuItems = [
  { path: "/", label: "Inicio", key: "inicio" },
  { path: "/beats", label: "Beats", key: "beats" },
  { path: "/carrito", label: "Carrito", key: "carrito" },
  { path: "/admin", label: "Administracion", key: "administracion" },
];

/**
 * Verifica si un elemento del menú está activo
 * @param {string} itemKey - Clave del elemento del menú
 * @param {string} activeItem - Elemento activo actual
 * @returns {boolean} True si el elemento está activo
 */
export const isMenuItemActive = (itemKey, activeItem) => {
  return itemKey === activeItem;
};

/**
 * Obtiene la clase CSS para un elemento del menú
 * @param {string} itemKey - Clave del elemento del menú
 * @param {string} activeItem - Elemento activo actual
 * @returns {string} Clase CSS del elemento
 */
export const getMenuItemClass = (itemKey, activeItem) => {
  return isMenuItemActive(itemKey, activeItem) ? "active" : "";
};
