import React, { useState, useEffect } from 'react';
import { obtenerBeats, crearBeat, actualizarBeat, eliminarBeat, obtenerGeneros } from '../services/beatsService';

export default function AdminBeats() {
  const [beats, setBeats] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [generos, setGeneros] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [beatEditando, setBeatEditando] = useState(null);
  const [form, setForm] = useState({
    titulo: '',
    artista: '',
    genero: '',
    precio: '',
    imagenUrl: '',
    audioUrl: '',
    descripcion: '',
    emocion: '',
    imagenFile: null,
    audioFile: null
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
    setForm({ titulo: '', artista: '', genero: generos[0] || '', precio: '', imagenUrl: '', audioUrl: '', descripcion: '', emocion: '', imagenFile: null, audioFile: null });
    setMostrarForm(true);
  };

  const handleEditar = (beat) => {
    setBeatEditando(beat);
    setForm({
      titulo: beat.titulo || '',
      artista: beat.artista || '',
      genero: beat.genero || '',
      precio: beat.precio || '',
      imagenUrl: beat.imagenUrl || beat.imagen || '',
      audioUrl: beat.audioUrl || beat.audio || '',
      descripcion: beat.descripcion || '',
      emocion: beat.emocion || '',
      imagenFile: null,
      audioFile: null
    });
    setMostrarForm(true);
  };

  const handleCancelar = () => {
    setMostrarForm(false);
    setBeatEditando(null);
    setForm({ titulo: '', artista: '', genero: '', precio: '', imagenUrl: '', audioUrl: '', descripcion: '', emocion: '', imagenFile: null, audioFile: null });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    
    if (!form.titulo || !form.artista || !form.genero || !form.precio) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('titulo', form.titulo);
      formData.append('artista', form.artista);
      formData.append('genero', form.genero);
      formData.append('precio', form.precio);
      formData.append('descripcion', form.descripcion || '');
      formData.append('emocion', form.emocion || '');
      
      if (form.imagenFile) {
        formData.append('imagen', form.imagenFile);
      } else if (form.imagenUrl) {
        formData.append('imagenUrl', form.imagenUrl);
      }
      
      if (form.audioFile) {
        formData.append('audio', form.audioFile);
      } else if (form.audioUrl) {
        formData.append('audioUrl', form.audioUrl);
      }

      if (beatEditando) {
        await actualizarBeat(beatEditando.id, formData);
        alert('Beat actualizado exitosamente');
      } else {
        await crearBeat(formData);
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
                    <label>Título *</label>
                    <input type="text" className="form-control" name="titulo" value={form.titulo} onChange={handleChange} required />
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
                    <label>Emoción del Audio</label>
                    <select className="form-control" name="emocion" value={form.emocion} onChange={handleChange}>
                      <option value="">Seleccionar...</option>
                      <option value="Feliz">Feliz</option>
                      <option value="Triste">Triste</option>
                      <option value="Energético">Energético</option>
                      <option value="Relajado">Relajado</option>
                      <option value="Romántico">Romántico</option>
                      <option value="Agresivo">Agresivo</option>
                      <option value="Melancólico">Melancólico</option>
                      <option value="Motivacional">Motivacional</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Imagen del Producto</label>
                    <input type="file" className="form-control" name="imagenFile" onChange={handleFileChange} accept="image/*" />
                    <small className="form-text text-muted">O ingresa URL: </small>
                    <input type="text" className="form-control mt-1" name="imagenUrl" value={form.imagenUrl} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" />
                    {form.imagenFile && <small className="text-success d-block mt-1">Archivo seleccionado: {form.imagenFile.name}</small>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Archivo de Audio</label>
                    <input type="file" className="form-control" name="audioFile" onChange={handleFileChange} accept="audio/*" />
                    <small className="form-text text-muted">O ingresa URL: </small>
                    <input type="text" className="form-control mt-1" name="audioUrl" value={form.audioUrl} onChange={handleChange} placeholder="https://ejemplo.com/audio.mp3" />
                    {form.audioFile && <small className="text-success d-block mt-1">Archivo seleccionado: {form.audioFile.name}</small>}
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
                <th>Título</th>
                <th>Artista</th>
                <th>Género</th>
                <th>Emoción</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    <i className="fa fa-spinner fa-spin mr-2"></i>Cargando beats...
                  </td>
                </tr>
              ) : beats.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted">No hay beats disponibles</td>
                </tr>
              ) : (
                beats.map((beat) => (
                  <tr key={beat.id}>
                    <td>{beat.id}</td>
                    <td>{beat.titulo}</td>
                    <td>{beat.artista}</td>
                    <td>{beat.genero}</td>
                    <td>{beat.emocion || '-'}</td>
                    <td>{formatearPrecio(beat.precio)}</td>
                    <td>
                      <button className="btn btn-sm btn-primary mr-2" onClick={() => handleEditar(beat)} title="Editar">
                        <i className="fa fa-edit"></i>
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(beat.id, beat.titulo)} title="Eliminar">
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
