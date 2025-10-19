/**
 * Index de servicios - Exportaciones centralizadas
 * Importa y exporta todos los servicios para fácil acceso
 */

// Servicios de API
export * from './authService';
export * from './beatsService';
export * from './carritoService';
export * from './usuariosService';

// Exportar instancia de axios configurada
export { default as api } from './api';
