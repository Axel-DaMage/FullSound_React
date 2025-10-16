export function validarRegistro({ nombre, correo, password, confirmPassword, terminos }) {
  const errores = {};

  // Nombre
  if (!nombre || nombre.trim().length < 3) {
    errores.nombre = "El nombre debe tener al menos 3 caracteres.";
  }

  // Correo
  if (!correo || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo)) {
    errores.correo = "Correo electrónico inválido.";
  }

  // Password
  if (!password || password.length < 6) {
    errores.password = "La contraseña debe tener al menos 6 caracteres.";
  }

  // Confirmar Password
  if (password !== confirmPassword) {
    errores.confirmPassword = "Las contraseñas no coinciden.";
  }

  // Términos
  if (!terminos) {
    errores.terminos = "Debes aceptar los términos y condiciones.";
  }

  return errores;
}