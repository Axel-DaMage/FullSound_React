// Función para registrar usuario (se usa en Registro.jsx)
export function registrarUsuario({ nombre, correo, password, confirmPassword, terminos }, navigate) {
  if (nombre.trim().length === 0) {
    alert('Por favor ingresa tu nombre completo.');
    return false;
  }

  if (!correo.endsWith('@gmail.com') && !correo.endsWith('@duocuc.cl')) {
    alert('El correo debe terminar con "@gmail.com" o con "@duocuc.cl".');
    return false;
  }

  if (password.length < 4 || password.length > 10) {
    alert('La contraseña debe tener entre 4 y 10 caracteres.');
    return false;
  }

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden.');
    return false;
  }

  if (!terminos) {
    alert('Debes aceptar los términos y condiciones.');
    return false;
  }

  alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
  if (navigate) {
    navigate('/login');
  }
  return true;
}
