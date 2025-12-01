import React, { useState, useEffect } from 'react';
import { obtenerUsuarios, actualizarUsuario, eliminarUsuario } from '../services/usuariosService';
import api from '../services/api';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editando, setEditando] = useState(null);
  const [formEdit, setFormEdit] = useState({
    nombreUsuario: '',
    correo: '',
    nombre: '',
    apellido: '',
    activo: true
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const response = await obtenerUsuarios();
      console.log('[ADMIN_USUARIOS] Usuarios obtenidos:', response.data);
      setUsuarios(response.data || []);
      setError(null);
    } catch (error) {
      console.error('[ADMIN_USUARIOS] Error al cargar usuarios:', error);
      setError('No se pudieron cargar los usuarios. Verifica que tengas permisos de administrador.');
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const iniciarEdicion = (usuario) => {
    setEditando(usuario.id);
    setFormEdit({
      nombreUsuario: usuario.nombreUsuario,
      correo: usuario.correo,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      activo: usuario.activo
    });
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setFormEdit({
      nombreUsuario: '',
      correo: '',
      nombre: '',
      apellido: '',
      activo: true
    });
  };

  const guardarUsuario = async (id) => {
    try {
      // Solo enviar los campos que pueden ser actualizados
      const datosActualizar = {
        nombreUsuario: formEdit.nombreUsuario,
        correo: formEdit.correo
      };
      
      await actualizarUsuario(id, datosActualizar);
      alert('Usuario actualizado correctamente');
      setEditando(null);
      cargarUsuarios(); // Recargar lista
    } catch (error) {
      console.error('[ADMIN_USUARIOS] Error al actualizar usuario:', error);
      alert(error.response?.data?.message || 'Error al actualizar el usuario');
    }
  };

  const toggleActivarUsuario = async (usuario) => {
    const nuevoEstado = !usuario.activo;
    const confirmacion = confirm(
      nuevoEstado 
        ? `¿Activar al usuario ${usuario.nombreUsuario}?`
        : `¿Desactivar al usuario ${usuario.nombreUsuario}?`
    );
    
    if (!confirmacion) return;

    try {
      if (nuevoEstado) {
        // Usar el endpoint PATCH para activar
        await api.patch(`/usuarios/${usuario.id}/activate`);
      } else {
        // Usar el endpoint DELETE para desactivar
        await api.delete(`/usuarios/${usuario.id}`);
      }
      alert(`Usuario ${nuevoEstado ? 'activado' : 'desactivado'} correctamente`);
      cargarUsuarios();
    } catch (error) {
      console.error('[ADMIN_USUARIOS] Error al cambiar estado:', error);
      alert(error.response?.data?.message || 'Error al cambiar el estado del usuario');
    }
  };

  const eliminarUsuarioPermanente = async (id, nombreUsuario) => {
    console.log('[ADMIN_USUARIOS] Intentando eliminar usuario:', { id, nombreUsuario });
    
    const confirmacion = confirm(
      `¿ELIMINAR PERMANENTEMENTE al usuario ${nombreUsuario}?\n\nEsta acción NO se puede deshacer.`
    );
    
    if (!confirmacion) return;

    try {
      console.log('[ADMIN_USUARIOS] Llamando a eliminarUsuario con ID:', id);
      await eliminarUsuario(id);
      alert('Usuario eliminado correctamente');
      cargarUsuarios();
    } catch (error) {
      console.error('[ADMIN_USUARIOS] Error completo al eliminar usuario:', error);
      console.error('[ADMIN_USUARIOS] Error response:', error.response);
      
      let errorMsg = 'Error al eliminar el usuario';
      if (error.response?.status === 404) {
        errorMsg = 'Usuario no encontrado. Es posible que ya haya sido eliminado.';
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.message) {
        errorMsg = error.message;
      }
      
      alert(errorMsg);
    }
  };

  const getRolNombre = (roles) => {
    if (!roles || roles.length === 0) return 'Sin rol';
    return roles.map(r => r.nombre || r).join(', ');
  };

  if (loading) {
    return (
      <div className="admin-section mb-5">
        <h2 className="text-center mb-4 text-white">Gestión de Usuarios</h2>
        <div className="text-center text-white">
          <p>Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-section mb-5">
        <h2 className="text-center mb-4 text-white">Gestión de Usuarios</h2>
        <div className="alert alert-danger text-center">
          <p>{error}</p>
          <button className="btn btn-warning mt-2" onClick={cargarUsuarios}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-section mb-5">
      <h2 className="text-center mb-4 text-white">Gestión de Usuarios</h2>
      
      <div className="table-responsive">
        <table className="table table-dark table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>
                    {editando === usuario.id ? (
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={formEdit.nombreUsuario}
                        onChange={(e) => setFormEdit({...formEdit, nombreUsuario: e.target.value})}
                      />
                    ) : (
                      usuario.nombreUsuario
                    )}
                  </td>
                  <td>
                    {editando === usuario.id ? (
                      <input
                        type="email"
                        className="form-control form-control-sm"
                        value={formEdit.correo}
                        onChange={(e) => setFormEdit({...formEdit, correo: e.target.value})}
                      />
                    ) : (
                      usuario.correo
                    )}
                  </td>
                  <td>
                    {editando === usuario.id ? (
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={formEdit.nombre}
                        onChange={(e) => setFormEdit({...formEdit, nombre: e.target.value})}
                      />
                    ) : (
                      usuario.nombre
                    )}
                  </td>
                  <td>
                    {editando === usuario.id ? (
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={formEdit.apellido}
                        onChange={(e) => setFormEdit({...formEdit, apellido: e.target.value})}
                      />
                    ) : (
                      usuario.apellido
                    )}
                  </td>
                  <td>{getRolNombre(usuario.roles)}</td>
                  <td>
                    <span className={`badge ${usuario.activo ? 'bg-success' : 'bg-secondary'}`}>
                      {usuario.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    {editando === usuario.id ? (
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-success"
                          onClick={() => guardarUsuario(usuario.id)}
                        >
                          ✓
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={cancelarEdicion}
                        >
                          ✗
                        </button>
                      </div>
                    ) : (
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-primary"
                          onClick={() => iniciarEdicion(usuario)}
                        >
                          Editar
                        </button>
                        <button
                          className={`btn ${usuario.activo ? 'btn-warning' : 'btn-info'}`}
                          onClick={() => toggleActivarUsuario(usuario)}
                        >
                          {usuario.activo ? 'Desactivar' : 'Activar'}
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => eliminarUsuarioPermanente(usuario.id, usuario.nombreUsuario)}
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
