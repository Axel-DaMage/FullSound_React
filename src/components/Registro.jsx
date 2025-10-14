import React, { useEffect, useState } from "react";
import { inicializarPrecarga } from "../utils/ui";
import { registrarUsuario } from "../utils/validacion";

export default function Registro() {
  const [showPreloader, setShowPreloader] = useState(true);
  
  useEffect(() => {
    return inicializarPrecarga(setShowPreloader);
  }, []);

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmPassword: "",
    terminos: false,
  });

  const onChange = (e) => {
    const { id, value, checked, type } = e.target;
    setForm((f) => ({ ...f, [id]: type === "checkbox" ? checked : value }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    registrarUsuario(form);
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
      </header>
      <main style={{ flex: 1 }}>
        <section className="login-section spad" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-5">
                <div className="card shadow p-4">
                  <h2 className="text-center mb-4">Crear Cuenta</h2>
                  <form onSubmit={onSubmit}>
                    <div className="form-group">
                      <label htmlFor="nombre">Nombre completo</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        placeholder="Ingresa tu nombre completo"
                        value={form.nombre}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="correo">Correo electrónico</label>
                      <input
                        type="email"
                        className="form-control"
                        id="correo"
                        placeholder="Ingresa tu correo"
                        value={form.correo}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Crea una contraseña"
                        value={form.password}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirmar contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirma tu contraseña"
                        value={form.confirmPassword}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="terminos"
                        checked={form.terminos}
                        onChange={onChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="terminos">
                        Acepto los <a href="#" className="text-primary">términos y condiciones</a>
                      </label>
                    </div>
                    <div className="d-flex flex-column gap-3 mt-4">
                      <button type="submit" className="site-btn btn-block" style={{ fontSize: "1.2rem" }}>
                        Crear Cuenta
                      </button>
                      <div className="text-center">
                        <p className="mb-0">
                          ¿Ya tienes cuenta? <a href="Sesion.html" className="text-primary">Inicia sesión aquí</a>
                        </p>
                      </div>
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
