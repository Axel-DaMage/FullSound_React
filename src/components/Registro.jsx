import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrarUsuario } from "../utils/validacion";
import Layout from "./Layout";

export default function Registro() {
  const navigate = useNavigate();
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
  const onSubmit = (e) => {    e.preventDefault();    registrarUsuario(form, navigate);
  };
    return (
    <Layout>
        <section className="login-section spad">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
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
                        Acepto los <button type="button" className="btn btn-link text-primary p-0" style={{textDecoration: 'underline', border: 'none', background: 'none'}}>términos y condiciones</button>
                      </label>
                    </div>
                    <div className="d-flex flex-column gap-3 mt-4">
                      <button type="submit" className="site-btn btn-block">
                        Crear Cuenta
                      </button><div className="text-center">
                        <p className="mb-0">
                          ¿Ya tienes cuenta? <Link to="/login" className="text-primary">Inicia sesión aquí</Link>
                        </p>
                      </div>
                    </div>
                  </form>                </div>
              </div>
            </div>
        </div>
        </section>
    </Layout>
  );
}
