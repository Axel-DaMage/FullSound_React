import React, { useState, useEffect } from 'react';
import { obtenerBeats, crearBeat, actualizarBeat, eliminarBeat, obtenerGeneros } from '../services/beatsService';

export default function AdminBeats() {
  const [beats, setBeats] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [generos, setGeneros] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [beatEditando, setBeatEditando] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    artista: '',
    genero: '',
    precio: '',
    imagen: '',
    audio: '',
    descripcion: ''
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    await Promise.all([cargarBeats(), cargarGeneros()]);
  };

  const cargarBeats = async () => {
    try {
      setCargando(true);
      const response = await obtenerBeats();
      setBeats(response.data || []);
    } catch (error) {
      console.error('Error al cargar beats:', error);
      const { datosBeats } = await import('../utils/datosMusica');
      setBeats(datosBeats);
    } finally {
      setCargando(false);
    }
  };

  const cargarGeneros = async () => {
    try {
      const response = await obtenerGeneros();
      setGeneros(response.data || ['Hip Hop', 'Trap', 'R&B', 'Pop', 'Reggaeton']);
    } catch (error) {
      setGeneros(['Hip Hop', 'Trap', 'R&B', 'Pop', 'Reggaeton']);
    }
  };

  const handleNuevo = () => {
    setBeatEditando(null);
    setForm({ nombre: '', artista: '', genero: generos[0] || '', precio: '', imagen: '', audio: '', descripcion: '' });
    setMostrarForm(true);
  };

  const handleEditar = (beat) => {
    setBeatEditando(beat);
    setForm({
      nombre: beat.nombre || '',
      artista: beat.artista || '',
      genero: beat.genero || '',
      precio: beat.precio || '',
      imagen: beat.imagen || '',
      audio: beat.audio || '',
      descripcion: beat.descripcion || ''
    });
    setMostrarForm(true);
  };

  const handleCancelar = () => {
    setMostrarForm(false);
    setBeatEditando(null);
    setForm({ nombre: '', artista: '', genero: '', precio: '', imagen: '', audio: '', descripcion: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    
    if (!form.nombre || !form.artista || !form.genero || !form.precio) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      if (beatEditando) {
        await actualizarBeat(beatEditando.id, form);
        alert('Beat actualizado exitosamente');
      } else {
        // Asigna un id único al nuevo beat
        const nuevoBeat = { ...form, id: Date.now() };
        await crearBeat(nuevoBeat);
        alert('Beat creado exitosamente');
      }
      
      handleCancelar();
      await cargarBeats();
    } catch (error) {
      console.error('Error al guardar beat:', error);
      alert('Error al guardar el beat: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEliminar = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de eliminar el beat "${nombre}"?`)) return;

    try {
      await eliminarBeat(id);
      alert('Beat eliminado exitosamente');
      await cargarBeats();
    } catch (error) {
      console.error('Error al eliminar beat:', error);
      alert('Error al eliminar el beat: ' + (error.response?.data?.message || error.message));
    }
  };

  const formatearPrecio = (precio) => {
  // Asegura que el precio sea un número antes de formatear
  const precioNum = typeof precio === 'string' ? parseFloat(precio) : precio;
  if (isNaN(precioNum)) return '$0';
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(precioNum);
  };

  return (
    <div className="card bg-dark text-white">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="mb-0">Gestión de Beats</h3>
        <button className="btn btn-success" onClick={handleNuevo}>
          <i className="fa fa-plus mr-2"></i>Nuevo Beat
        </button>
      </div>
      <div className="card-body">
        <p className="text-muted">Administra el catálogo de beats disponibles para la venta.</p>
        
        {mostrarForm && (
          <div className="mb-4 p-3 border border-secondary rounded">
            <h4 className="mb-3">{beatEditando ? 'Editar Beat' : 'Nuevo Beat'}</h4>
            <form onSubmit={handleGuardar}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Nombre *</label>
                    <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Artista *</label>
                    <input type="text" className="form-control" name="artista" value={form.artista} onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Género *</label>
                    <select className="form-control" name="genero" value={form.genero} onChange={handleChange} required>
                      <option value="">Seleccionar...</option>
                      {generos.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Precio (CLP) *</label>
                    <input type="number" className="form-control" name="precio" value={form.precio} onChange={handleChange} min="0" required />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>URL Imagen</label>
                    <input type="text" className="form-control" name="imagen" value={form.imagen} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>URL Audio</label>
                    <input type="text" className="form-control" name="audio" value={form.audio} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Descripción</label>
                    <textarea className="form-control" name="descripcion" value={form.descripcion} onChange={handleChange} rows="3" />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary mr-2" onClick={handleCancelar}>Cancelar</button>
                <button type="submit" className="btn btn-success">
                  <i className="fa fa-save mr-2"></i>{beatEditando ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Artista</th>
                <th>Género</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    <i className="fa fa-spinner fa-spin mr-2"></i>Cargando beats...
                  </td>
                </tr>
              ) : beats.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No hay beats disponibles</td>
                </tr>
              ) : (
                beats.map((beat) => (
                  <tr key={beat.id}>
                    <td>{beat.id}</td>
                    <td>{beat.nombre || beat.titulo}</td>
                    <td>{beat.artista}</td>
                    <td>{beat.genero}</td>
                    <td>{formatearPrecio(beat.precio)}</td>
                    <td>
                      <button className="btn btn-sm btn-primary mr-2" onClick={() => handleEditar(beat)} title="Editar">
                        <i className="fa fa-edit"></i>
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(beat.id, beat.nombre || beat.titulo)} title="Eliminar">
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
