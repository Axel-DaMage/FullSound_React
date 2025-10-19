/**
 * Utilidades para manejo de roles y permisos
 */

/**
 * Roles disponibles en el sistema
 */
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

/**
 * Permisos por rol
 */
export const PERMISOS = {
  [ROLES.ADMIN]: [
    'crear_beat',
    'editar_beat',
    'eliminar_beat',
    'ver_usuarios',
    'editar_usuarios',
    'eliminar_usuarios',
    'ver_estadisticas',
    'gestionar_ordenes'
  ],
  [ROLES.USER]: [
    'ver_beats',
    'comprar_beats',
    'gestionar_carrito',
    'ver_perfil',
    'editar_perfil'
  ]
};

/**
 * Verifica si un usuario tiene un rol específico
 * @param {Object} usuario - Objeto del usuario
 * @param {string} rol - Rol a verificar
 * @returns {boolean}
 */
export const tieneRol = (usuario, rol) => {
  if (!usuario || !usuario.rol) return false;
  return usuario.rol === rol;
};

/**
 * Verifica si el usuario es administrador
 * @param {Object} usuario - Objeto del usuario
 * @returns {boolean}
 */
export const esAdmin = (usuario) => {
  return tieneRol(usuario, ROLES.ADMIN);
};

/**
 * Verifica si un usuario tiene un permiso específico
 * @param {Object} usuario - Objeto del usuario
 * @param {string} permiso - Permiso a verificar
 * @returns {boolean}
 */
export const tienePermiso = (usuario, permiso) => {
  if (!usuario || !usuario.rol) return false;
  
  const permisosDelRol = PERMISOS[usuario.rol] || [];
  return permisosDelRol.includes(permiso);
};

/**
 * Verifica si el usuario puede acceder a una ruta
 * @param {Object} usuario - Objeto del usuario
 * @param {string} ruta - Ruta a verificar
 * @returns {boolean}
 */
export const puedeAccederARuta = (usuario, ruta) => {
  // Rutas públicas (accesibles sin autenticación)
  const rutasPublicas = ['/', '/beats', '/login', '/registro', '/creditos'];
  if (rutasPublicas.includes(ruta)) return true;

  // Rutas que requieren autenticación
  if (!usuario) return false;

  // Rutas exclusivas de admin
  const rutasAdmin = ['/admin'];
  if (rutasAdmin.some(r => ruta.startsWith(r))) {
    return esAdmin(usuario);
  }

  // Rutas de usuario autenticado
  const rutasAutenticadas = ['/carrito', '/perfil', '/producto'];
  if (rutasAutenticadas.some(r => ruta.startsWith(r))) {
    return true;
  }

  return false;
};

/**
 * Obtiene el usuario actual del localStorage
 * @returns {Object|null}
 */
export const obtenerUsuarioActual = () => {
  try {
    const userString = localStorage.getItem('user');
    if (!userString) return null;
    return JSON.parse(userString);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return null;
  }
};

/**
 * Guarda el usuario en localStorage
 * @param {Object} usuario - Datos del usuario
 */
export const guardarUsuario = (usuario) => {
  try {
    localStorage.setItem('user', JSON.stringify(usuario));
  } catch (error) {
    console.error('Error al guardar usuario:', error);
  }
};

/**
 * Elimina el usuario del localStorage
 */
export const limpiarUsuario = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

/**
 * Verifica si hay un usuario autenticado
 * @returns {boolean}
 */
export const estaAutenticado = () => {
  return !!localStorage.getItem('token');
};

/**
 * Requiere autenticación - redirige a login si no está autenticado
 * @param {Function} navigate - Función de navegación de react-router
 * @returns {Object|null} Usuario actual o null
 */
export const requiereAutenticacion = (navigate) => {
  const usuario = obtenerUsuarioActual();
  if (!usuario || !estaAutenticado()) {
    navigate('/login');
    return null;
  }
  return usuario;
};

/**
 * Requiere rol de admin - redirige a inicio si no es admin
 * @param {Function} navigate - Función de navegación de react-router
 * @returns {Object|null} Usuario actual o null
 */
export const requiereAdmin = (navigate) => {
  const usuario = requiereAutenticacion(navigate);
  if (!usuario) return null;

  if (!esAdmin(usuario)) {
    navigate('/');
    alert('No tienes permisos para acceder a esta página.');
    return null;
  }

  return usuario;
};
