import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { validarCredenciales, getFieldValue } from "../utils/formUtils";

export default function Login() {
  const navigate = useNavigate();

  const handleUsuariosClick = (e) => {
    e.preventDefault();
    const correo = getFieldValue('correo');
    const password = getFieldValue('password');

    const validacion = validarCredenciales(correo, password);
    
    if (!validacion.isValid) {
      alert(validacion.error);
      return false;
    }
    
    navigate('/beats');
    return true;
  };

  const handleAdminClick = (e) => {
    e.preventDefault();
    const correo = getFieldValue('correo');
    const password = getFieldValue('password');

    const validacion = validarCredenciales(correo, password);
    
    if (!validacion.isValid) {
      alert(validacion.error);
      return false;
    }
    
    navigate('/admin');
    return true;
  };
  
  return (
    <Layout>
        <section className="login-section spad">
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
                        onClick={handleUsuariosClick}
                      >
                        Usuarios
                      </button>
                      <button
                        type="button"
                        className="site-btn btn-block btn-secondary"
                        onClick={handleAdminClick}
                      >
                        Administración
                      </button>
                    </div>
                  </form></div>
              </div>
            </div>
        </div>
        </section>
    </Layout>
  );
}
