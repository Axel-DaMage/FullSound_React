import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import AdminBeats from "./AdminBeats";
import { 
  obtenerUsuarioActual, 
  requiereAdmin 
} from "../utils/rolesPermisos";

export default function Administracion() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [tieneAcceso, setTieneAcceso] = useState(false);

  useEffect(() => {
    const usuarioActual = requiereAdmin(navigate);
    
    if (usuarioActual) {
      setUsuario(usuarioActual);
      setTieneAcceso(true);
    }
  }, [navigate]);

  if (!tieneAcceso) {
    return (
      <Layout activeItem="administracion">
        <section className="admin-container">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center text-white">
                <h2>Verificando permisos...</h2>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout activeItem="administracion">
      <section className="admin-container">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2 className="text-white mb-0">Panel de Administración</h2>
            <div className="text-white">
              <i className="fa fa-user-shield mr-2"></i>
              Administrador: <strong>{usuario?.nombre || usuario?.correo}</strong>
            </div>
          </div>
          
          <div className="row justify-content-center mb-5">
            <div className="col-md-3">
              <div className="stats-card">
                <div className="stats-number" id="totalBeats">9</div>
                <div>Total de Beats</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-card">
                <div className="stats-number" id="totalUsers">5</div>
                <div>Usuarios Registrados</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-card">
                <div className="stats-number" id="activeUsers">4</div>
                <div>Usuarios Activos</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-card">
                <div className="stats-number" id="totalSales">$1,354,999</div>
                <div>Ventas Totales</div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12">
              <AdminBeats />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card bg-dark text-white">
                <div className="card-header">
                  <h3 className="mb-0">Gestión de Usuarios</h3>
                </div>
                <div className="card-body">
                  <p className="text-muted">Administra los usuarios registrados en la plataforma.</p>
                  <div className="alert alert-info">
                    <strong>Próximamente:</strong> Funcionalidad de gestión de usuarios en desarrollo.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
