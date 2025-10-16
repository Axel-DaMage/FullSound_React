export function validarRegistro({ nombre, correo, password, confirmPassword, terminos }) {
  const errores = {};


  if (!nombre || nombre.trim().length < 3) {
    errores.nombre = "El nombre debe tener al menos 3 caracteres.";
  }


  if (!correo || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo)) {
    errores.correo = "Correo electrónico inválido.";
  }


  if (!password || password.length < 6) {
    errores.password = "La contraseña debe tener al menos 6 caracteres.";
  }


  if (password !== confirmPassword) {
    errores.confirmPassword = "Las contraseñas no coinciden.";
  }


  if (!terminos) {
    errores.terminos = "Debes aceptar los términos y condiciones.";
  }

  return errores;
}