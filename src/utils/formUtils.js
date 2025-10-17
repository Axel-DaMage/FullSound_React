/**
 * Utilidades para formularios y validaciones
 */

/**
 * Valida que un correo tenga dominios permitidos
 * @param {string} correo - Correo electrónico a validar
 * @returns {boolean} True si el correo es válido
 */
export const validarCorreo = (correo) => {
  if (!correo) return false;
  const correoTrim = correo.trim();
  return correoTrim.endsWith('@gmail.com') || correoTrim.endsWith('@duocuc.cl');
};

/**
 * Valida la longitud de una contraseña
 * @param {string} password - Contraseña a validar
 * @param {number} minLength - Longitud mínima (default: 4)
 * @param {number} maxLength - Longitud máxima (default: 10)
 * @returns {boolean} True si la contraseña es válida
 */
export const validarPassword = (password, minLength = 4, maxLength = 10) => {
  if (!password) return false;
  const length = password.length;
  return length >= minLength && length <= maxLength;
};

/**
 * Valida las credenciales de login
 * @param {string} correo - Correo electrónico
 * @param {string} password - Contraseña
 * @returns {object} Objeto con isValid y mensaje de error si aplica
 */
export const validarCredenciales = (correo, password) => {
  if (!validarCorreo(correo)) {
    return {
      isValid: false,
      error: 'El correo debe terminar con "@gmail.com" o con "@duocuc.cl".'
    };
  }
  
  if (password.length === 0) {
    return {
      isValid: false,
      error: 'Por favor ingresa tu contraseña.'
    };
  }
  
  if (!validarPassword(password)) {
    return {
      isValid: false,
      error: 'La contraseña debe tener entre 4 y 10 caracteres.'
    };
  }
  
  return { isValid: true };
};

/**
 * Obtiene el valor de un campo de formulario por ID
 * @param {string} fieldId - ID del campo
 * @returns {string} Valor del campo trimmed
 */
export const getFieldValue = (fieldId) => {
  const element = document.getElementById(fieldId);
  return element ? element.value.trim() : '';
};
