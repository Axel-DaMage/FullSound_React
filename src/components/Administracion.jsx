import React from "react";
import Layout from "./Layout";

export default function Administracion() {
  return (
    <Layout activeItem="administracion">
      <section className="admin-container">
        <div className="container">
          <h2 className="text-center mb-5 text-white">Panel de Administración</h2>
          <div className="row justify-content-center">
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
              </div>            </div>
          </div>        </div>
      </section>
    </Layout>
  );
}
