import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import AdminBeats from "./AdminBeats";
import AdminUsuarios from "./AdminUsuarios";
import EstadisticasAdmin from "./EstadisticasAdmin";
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
          
          <EstadisticasAdmin />

          <div className="row mb-4">
            <div className="col-12">
              <AdminBeats />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <AdminUsuarios />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
