import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { 
  validarCredenciales, 
  esCorreoAdmin 
} from "../utils/authValidation";
import { guardarUsuario } from "../utils/rolesPermisos";
import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    correo: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validar credenciales
    const validacion = validarCredenciales(form.correo, form.password);
    
    if (!validacion.isValid) {
      alert(validacion.error);
      return false;
    }

    setIsLoading(true);

    try {
      // Llamar al servicio de autenticación del backend
      const credentials = {
        nombreUsuario: form.correo,
        contraseña: form.password
      };
      
      const { data, source } = await login(credentials);
      
      console.log(`[LOGIN] Autenticación exitosa (${source})`, data);
      
      // El servicio ya guarda el token y usuario en localStorage
      // Obtener el usuario guardado
      const usuario = data.user;
      guardarUsuario(usuario);

      // Redirigir según el rol
      if (usuario.rol === 'administrador' || usuario.rol === 'admin') {
        alert('Bienvenido Administrador');
        navigate('/admin');
      } else {
        alert('Inicio de sesión exitoso');
        navigate('/beats');
      }

      return true;
    } catch (error) {
      console.error('[LOGIN] Error en autenticación:', error);
      alert('Error al iniciar sesión. Verifica tus credenciales.');
      return false;
    } finally {
      setIsLoading(false);
    }
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
                        disabled={isLoading}
                      >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
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
