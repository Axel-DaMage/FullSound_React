import React, { useEffect, useState } from "react";
import { initPreloader } from "../utils/ui";
import { validarLogin } from "../utils/validation";

export default function Login() {
  const [showPreloader, setShowPreloader] = useState(true);
  
  useEffect(() => {
    return initPreloader(setShowPreloader);
  }, []);

  const handleUsuariosClick = (e) => {
    validarLogin(e, 'tienda.html');
  };

  const handleAdminClick = (e) => {
    validarLogin(e, 'admin.html');
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", margin: 0 }}>
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
          <li><a href="admin.html">Administracion</a></li>
        </ul>
        <button className="mobile-menu-btn">
          <span />
          <span />
          <span />
        </button>
        <div className="mobile-menu">
          <a href="index.html">Inicio</a>
          <a href="Beats.html">Beats</a>
          <a href="carrito.html">Carrito</a>
          <a href="admin.html">Administracion</a>
        </div>
      </header>      <main style={{ flex: 1 }}>
        <section className="login-section spad" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-5">
                <div className="card shadow p-4">
                  <h2 className="text-center mb-4">Iniciar Sesión</h2>
                  <form>
                    <div className="form-group">
                      <label htmlFor="correo">Correo electrónico</label>
                      <input
                        type="email"
                        className="form-control"
                        id="correo"
                        placeholder="Ingresa tu correo"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Contraseña"
                        required
                      />
                    </div>
                    <div className="d-flex flex-column gap-3 mt-4">
                      <button
                        type="button"
                        className="site-btn btn-block mb-3"
                        style={{ fontSize: "1.2rem" }}
                        onClick={handleUsuariosClick}
                      >
                        Usuarios
                      </button>
                      <button
                        type="button"
                        className="site-btn btn-block btn-secondary"
                        style={{ fontSize: "1.2rem" }}
                        onClick={handleAdminClick}
                      >
                        Administración
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-section" style={{ marginTop: "auto" }}>
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
