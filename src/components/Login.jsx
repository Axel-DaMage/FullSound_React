import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { 
  validarCredenciales, 
  obtenerRolPorCorreo, 
  esCorreoAdmin 
} from "../utils/authValidation";
import { guardarUsuario } from "../utils/rolesPermisos";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    correo: "",
    password: "",
  });

  const onChange = (e) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Validar credenciales
    const validacion = validarCredenciales(form.correo, form.password);
    
    if (!validacion.isValid) {
      alert(validacion.error);
      return false;
    }

    // Determinar rol del usuario basado en el correo
    const rol = obtenerRolPorCorreo(form.correo);
    
    // Simular datos del usuario (en producción vendrán del backend)
    const usuario = {
      nombre: form.correo.split('@')[0], // Nombre temporal del correo
      correo: form.correo,
      rol: rol,
      id: Date.now() // ID temporal
    };

    // Guardar token y usuario en localStorage
    localStorage.setItem('token', `token_simulado_${Date.now()}`);
    guardarUsuario(usuario);

    // Redirigir según el rol
    if (rol === 'admin') {
      alert('Bienvenido Administrador');
      navigate('/admin');
    } else {
      alert('Inicio de sesión exitoso');
      navigate('/beats');
    }

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
                  <form onSubmit={handleLogin}>
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
                      <small className="form-text text-muted">
                        {esCorreoAdmin(form.correo) && '✓ Correo de administrador detectado'}
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Contraseña (mínimo 8 caracteres)"
                        value={form.password}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="d-flex flex-column gap-3 mt-4">
                      <button
                        type="submit"
                        className="site-btn btn-block"
                      >
                        Iniciar Sesión
                      </button>
                      <div className="text-center">
                        <p className="mb-0">
                          ¿No tienes cuenta? <a href="/FullSound_React/registro" className="text-primary">Regístrate aquí</a>
                        </p>
                      </div>
                    </div>
                  </form></div>
              </div>
            </div>
        </div>
        </section>
    </Layout>
  );
}
