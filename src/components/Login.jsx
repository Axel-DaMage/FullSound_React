import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

export default function Login() {
  const navigate = useNavigate();

  const handleUsuariosClick = (e) => {
    e.preventDefault();
    const correo = document.getElementById('correo').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!correo.endsWith('@gmail.com') && !correo.endsWith('@duocuc.cl')) {
      alert('El correo debe terminar con "@gmail.com" o con "@duocuc.cl".');
      return false;
    }
    if (password.length === 0) {
      alert('Por favor ingresa tu contraseña.');
      return false;
    }
    if (password.length >= 4 && password.length <= 10) {
      navigate('/beats');
      return true;
    } else {
      alert('La contraseña debe tener entre 4 y 10 caracteres.');
      return false;
    }
  };

  const handleAdminClick = (e) => {
    e.preventDefault();
    const correo = document.getElementById('correo').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!correo.endsWith('@gmail.com') && !correo.endsWith('@duocuc.cl')) {
      alert('El correo debe terminar con "@gmail.com" o con "@duocuc.cl".');
      return false;
    }
    if (password.length === 0) {
      alert('Por favor ingresa tu contraseña.');
      return false;
    }
    if (password.length >= 4 && password.length <= 10) {
      navigate('/admin');
      return true;
    } else {
      alert('La contraseña debe tener entre 4 y 10 caracteres.');
      return false;
    }  };
  
  return (
    <Layout>
        <section className="login-section spad" style={{ padding: "100px 0 80px", display: "flex", alignItems: "center", minHeight: "calc(100vh - 200px)" }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
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
                  </form>                </div>
              </div>
            </div>
        </div>
        </section>
    </Layout>
  );
}
