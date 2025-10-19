/**
 * Validaciones de autenticación y registro
 */

/**
 * Valida el formato de un correo electrónico
 * @param {string} correo - Correo a validar
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validarCorreo = (correo) => {
  if (!correo || correo.trim().length === 0) {
    return {
      isValid: false,
      error: 'El correo es requerido.'
    };
  }

  const correoTrim = correo.trim();
  
  // Regex básica para formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(correoTrim)) {
    return {
      isValid: false,
      error: 'El formato del correo es inválido.'
    };
  }

  return { isValid: true, error: null };
};

/**
 * Valida la contraseña
 * @param {string} password - Contraseña a validar
 * @param {number} minLength - Longitud mínima (default: 8)
 * @param {number} maxLength - Longitud máxima (default: 20)
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validarPassword = (password, minLength = 8, maxLength = 20) => {
  if (!password || password.length === 0) {
    return {
      isValid: false,
      error: 'La contraseña es requerida.'
    };
  }

  if (password.length < minLength) {
    return {
      isValid: false,
      error: `La contraseña debe tener al menos ${minLength} caracteres.`
    };
  }

  return { isValid: true, error: null };
};

/**
 * Valida el nombre completo
 * @param {string} nombre - Nombre a validar
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validarNombre = (nombre) => {
  if (!nombre || nombre.trim().length === 0) {
    return {
      isValid: false,
      error: 'El nombre es requerido.'
    };
  }

  if (nombre.trim().length < 3) {
    return {
      isValid: false,
      error: 'El nombre debe tener al menos 3 caracteres.'
    };
  }

  if (nombre.trim().length > 100) {
    return {
      isValid: false,
      error: 'El nombre no debe exceder 100 caracteres.'
    };
  }

  return { isValid: true, error: null };
};

/**
 * Valida que las contraseñas coincidan
 * @param {string} password - Contraseña
 * @param {string} confirmPassword - Confirmación de contraseña
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validarConfirmacionPassword = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.length === 0) {
    return {
      isValid: false,
      error: 'Debes confirmar tu contraseña.'
    };
  }

  if (password !== confirmPassword) {
    return {
      isValid: false,
      error: 'Las contraseñas no coinciden.'
    };
  }

  return { isValid: true, error: null };
};

/**
 * Valida los términos y condiciones
 * @param {boolean} terminos - Si aceptó los términos
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validarTerminos = (terminos) => {
  if (!terminos) {
    return {
      isValid: false,
      error: 'Debes aceptar los términos y condiciones.'
    };
  }

  return { isValid: true, error: null };
};

/**
 * Valida todo el formulario de registro
 * @param {Object} formData - Datos del formulario
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validarFormularioRegistro = (formData) => {
  const errors = {};
  let isValid = true;

  // Validar nombre
  const nombreValidacion = validarNombre(formData.nombre);
  if (!nombreValidacion.isValid) {
    errors.nombre = nombreValidacion.error;
    isValid = false;
  }

  // Validar correo
  const correoValidacion = validarCorreo(formData.correo);
  if (!correoValidacion.isValid) {
    errors.correo = correoValidacion.error;
    isValid = false;
  }

  // Validar contraseña
  const passwordValidacion = validarPassword(formData.password);
  if (!passwordValidacion.isValid) {
    errors.password = passwordValidacion.error;
    isValid = false;
  }

  // Validar confirmación de contraseña
  const confirmPasswordValidacion = validarConfirmacionPassword(
    formData.password, 
    formData.confirmPassword
  );
  if (!confirmPasswordValidacion.isValid) {
    errors.confirmPassword = confirmPasswordValidacion.error;
    isValid = false;
  }

  // Validar términos
  const terminosValidacion = validarTerminos(formData.terminos);
  if (!terminosValidacion.isValid) {
    errors.terminos = terminosValidacion.error;
    isValid = false;
  }

  return { isValid, errors };
};

/**
 * Valida las credenciales de login
 * @param {string} correo - Correo electrónico
 * @param {string} password - Contraseña
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validarCredenciales = (correo, password) => {
  // Validar correo
  const correoValidacion = validarCorreo(correo);
  if (!correoValidacion.isValid) {
    return correoValidacion;
  }

  // Validar que la contraseña no esté vacía
  if (!password || password.length === 0) {
    return {
      isValid: false,
      error: 'Por favor ingresa tu contraseña.'
    };
  }

  return { isValid: true, error: null };
};

/**
 * Determina si un correo es de administrador
 * @param {string} correo - Correo a verificar
 * @returns {boolean}
 */
export const esCorreoAdmin = (correo) => {
  if (!correo) return false;
  return correo.toLowerCase().endsWith('@admin.cl');
};

/**
 * Extrae el rol del usuario basado en su correo
 * @param {string} correo - Correo del usuario
 * @returns {string} 'admin' o 'user'
 */
export const obtenerRolPorCorreo = (correo) => {
  return esCorreoAdmin(correo) ? 'admin' : 'user';
};
