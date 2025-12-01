import React, { useState, useEffect } from 'react';
import { obtenerBeats } from '../services/beatsService';
import { obtenerUsuarios } from '../services/usuariosService';

export default function EstadisticasAdmin() {
  const [stats, setStats] = useState({
    totalBeats: 0,
    totalUsuarios: 0,
    usuariosActivos: 0,
    loading: true
  });

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      // Obtener beats
      const beatsResponse = await obtenerBeats();
      const totalBeats = beatsResponse.data?.length || 0;

      // Obtener usuarios (solo admin puede verlos)
      let totalUsuarios = 0;
      let usuariosActivos = 0;
      
      try {
        const usuariosResponse = await obtenerUsuarios();
        const usuarios = usuariosResponse.data || [];
        totalUsuarios = usuarios.length;
        usuariosActivos = usuarios.filter(u => u.activo).length;
      } catch (error) {
        console.log('[STATS] No se pudieron obtener usuarios (requiere permisos admin)');
      }

      setStats({
        totalBeats,
        totalUsuarios,
        usuariosActivos,
        loading: false
      });
    } catch (error) {
      console.error('[STATS] Error al cargar estadísticas:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  if (stats.loading) {
    return (
      <div className="row justify-content-center mb-5">
        <div className="col-12 text-center text-white">
          <p>Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center mb-5">
      <div className="col-md-4">
        <div className="stats-card">
          <div className="stats-number">{stats.totalBeats}</div>
          <div>Total de Beats</div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="stats-card">
          <div className="stats-number">{stats.totalUsuarios}</div>
          <div>Usuarios Registrados</div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="stats-card">
          <div className="stats-number">{stats.usuariosActivos}</div>
          <div>Usuarios Activos</div>
        </div>
      </div>
    </div>
  );
}
