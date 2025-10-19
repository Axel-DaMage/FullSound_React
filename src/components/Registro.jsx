import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { 
  validarFormularioRegistro, 
  obtenerRolPorCorreo,
  esCorreoAdmin 
} from "../utils/authValidation";
import { guardarUsuario } from "../utils/rolesPermisos";

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

  const onSubmit = (e) => {
    e.preventDefault();

    // Validar formulario completo
    const validacion = validarFormularioRegistro(
      form.nombre,
      form.correo,
      form.password,
      form.confirmPassword,
      form.terminos
    );

    if (!validacion.isValid) {
      alert(validacion.error);
      return;
    }

    // Determinar rol del usuario basado en el correo
    const rol = obtenerRolPorCorreo(form.correo);

    // Simular creación de usuario (en producción se enviará al backend)
    const usuario = {
      nombre: form.nombre,
      correo: form.correo,
      rol: rol,
      id: Date.now(),
      fechaRegistro: new Date().toISOString()
    };

    // Guardar token y usuario en localStorage
    localStorage.setItem('token', `token_simulado_${Date.now()}`);
    guardarUsuario(usuario);

    // Mostrar mensaje de éxito
    if (rol === 'admin') {
      alert('¡Cuenta de administrador creada exitosamente! Serás redirigido al panel de administración.');
      navigate('/admin');
    } else {
      alert('¡Cuenta creada exitosamente! Serás redirigido a la tienda de beats.');
      navigate('/beats');
    }
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
                      <small className="form-text text-muted">
                        {form.correo && (
                          esCorreoAdmin(form.correo) 
                            ? '✓ Correo de administrador (@admin.cl)' 
                            : 'Correo de usuario regular'
                        )}
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Crea una contraseña (mínimo 8 caracteres)"
                        value={form.password}
                        onChange={onChange}
                        required
                      />
                      <small className="form-text text-muted">
                        Debe tener al menos 8 caracteres, máximo 20, con letras y números
                      </small>
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
                        Acepto los <Link to="/terminos" className="text-primary"> términos y condiciones </Link>
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
