import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { 
  validarFormularioRegistro,
  esCorreoAdmin,
  formatearRut
} from "../utils/authValidation";
import { registrar, login } from "../services/authService";
import { guardarUsuario } from "../utils/rolesPermisos";

export default function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    rut: "",
    correo: "",
    password: "",
    confirmPassword: "",
    terminos: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    const { id, value, checked, type } = e.target;
    
    // Formatear RUT automáticamente mientras se escribe
    if (id === 'rut' && type !== 'checkbox') {
      setForm((f) => ({ ...f, [id]: formatearRut(value) }));
    } else {
      setForm((f) => ({ ...f, [id]: type === "checkbox" ? checked : value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario completo
    const validacion = validarFormularioRegistro(form);

    if (!validacion.isValid) {
      // Mostrar el primer error encontrado
      const primerError = Object.values(validacion.errors)[0];
      alert(primerError || 'Por favor completa todos los campos correctamente');
      return;
    }

    setIsLoading(true);

    try {
      // Determinar el rol según el correo
      const esAdmin = esCorreoAdmin(form.correo);
      const rolAsignado = esAdmin ? 'administrador' : 'cliente';
      
      console.log('[REGISTRO] Correo:', form.correo);
      console.log('[REGISTRO] Es admin?', esAdmin);
      console.log('[REGISTRO] Rol asignado:', rolAsignado);
      
      // Llamar al servicio de registro del backend
      const userData = {
        nombreUsuario: form.nombre,
        rut: form.rut,
        correo: form.correo,
        contraseña: form.password,
        rol: rolAsignado
      };

      console.log('[REGISTRO] Enviando datos completos:', userData);
      console.log('[REGISTRO] Datos enviados (password oculto):', { ...userData, contraseña: '[OCULTA]' });
      
      const registerResult = await registrar(userData);
      console.log('[REGISTRO] Respuesta completa del registro:', registerResult);
      
      const { data: registerResponse } = registerResult;
      console.log('[REGISTRO] Usuario registrado exitosamente', registerResponse);

      // Después de registrar exitosamente, hacer login automático
      const loginCredentials = {
        nombreUsuario: form.nombre,
        contraseña: form.password
      };

      const { data: loginData } = await login(loginCredentials);
      
      // Verificar que loginData existe y tiene user
      if (!loginData || !loginData.user) {
        throw new Error('Error al iniciar sesión después del registro');
      }
      
      const usuario = loginData.user;
      guardarUsuario(usuario);

      // Mostrar mensaje de éxito y redirigir según el rol
      if (usuario.rol === 'administrador' || usuario.rol === 'admin') {
        alert('¡Cuenta de administrador creada exitosamente! Serás redirigido al panel de administración.');
        navigate('/admin');
      } else {
        alert('¡Cuenta creada exitosamente! Serás redirigido a la tienda de beats.');
        navigate('/beats');
      }
    } catch (error) {
      console.error('[REGISTRO] Error completo:', error);
      
      // Extraer mensaje de error más específico
      let errorMsg = 'Error al crear la cuenta.';
      
      if (error.response) {
        // Error de respuesta del servidor
        errorMsg = error.response.data?.message || error.response.data || errorMsg;
      } else if (error.message) {
        errorMsg = error.message;
      }
      
      alert(errorMsg);
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
                      <label htmlFor="rut">RUT</label>
                      <input
                        type="text"
                        className="form-control"
                        id="rut"
                        placeholder="12.345.678-9"
                        value={form.rut}
                        onChange={onChange}
                        maxLength="12"
                        required
                      />
                      <small className="form-text text-muted">
                        Formato: XX.XXX.XXX-X
                      </small>
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
                      <button type="submit" className="site-btn btn-block" disabled={isLoading}>
                        {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
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
