import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  obtenerUsuarioActual, 
  estaAutenticado, 
  esAdmin 
} from "../utils/rolesPermisos";

/**
 * Componente para proteger rutas que requieren autenticación
 * @param {Object} props - Propiedades del componente
 * @param {React.Component} props.children - Componente hijo a renderizar si está autenticado
 * @param {boolean} props.requireAdmin - Si requiere rol de administrador
 * @param {string} props.redirectTo - Ruta a la que redirigir si no tiene acceso
 */
export default function ProtectedRoute({ 
  children, 
  requireAdmin = false,
  redirectTo = '/login' 
}) {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si está autenticado
    if (!estaAutenticado()) {
      alert('Debes iniciar sesión para acceder a esta página.');
      navigate(redirectTo);
      return;
    }

    // Si requiere admin, verificar el rol
    if (requireAdmin) {
      const usuario = obtenerUsuarioActual();
      if (!esAdmin(usuario)) {
        alert('No tienes permisos de administrador para acceder a esta página.');
        navigate('/');
        return;
      }
    }
  }, [navigate, requireAdmin, redirectTo]);

  // Si pasa todas las validaciones, renderizar el componente hijo
  return estaAutenticado() ? children : null;
}
