import React, { useEffect, useState } from "react";
import { inicializarPrecarga } from "../utils/ui";

export default function Administracion() {
  const [showPreloader, setShowPreloader] = useState(true);  
  useEffect(() => {
    return inicializarPrecarga(setShowPreloader);
  }, []);

  return (
    <div>
      {showPreloader && (
        <div id="preloder">
          <div className="loader" />
        </div>
      )}
      <header className="header-section clearfix">
        <a href="index.html" className="site-logo">
          <div className="logo-text">FullSound</div>
        </a>
        <div className="header-right">
          <div className="user-panel">
            <a href="Sesion.html" className="login">Iniciar sesión</a>
            <a href="registro.html" className="register">Crear una cuenta</a>
          </div>
        </div>
        <ul className="main-menu">
          <li><a href="index.html">Inicio</a></li>
          <li><a href="Beats.html">Beats</a></li>
          <li><a href="carrito.html">Carrito</a></li>
          <li><a href="admin.html" className="active">Administracion</a></li>
        </ul>
      </header>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer-section">
        <div className="container">
          <div className="footer-text">
            <a href="creditos.html"> Creditos </a>
          </div>
          <div className="logo-text">FullSound</div>
          <div className="copyright">
            Copyright &copy;{new Date().getFullYear()} Todos los derechos
            reservados | Esta plantilla fue creada con <i className="fa fa-heart-o" aria-hidden="true" /> por
            <a href="https://colorlib.com" target="_blank" rel="noreferrer"> Colorlib</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
