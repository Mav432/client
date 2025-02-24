export const validateUsername = (username) => {
    if (!username) return "El nombre de usuario es obligatorio";
    if (!/^[a-zA-Z]{4,}$/.test(username)) return "El nombre de usuario debe tener al menos 4 caracteres y solo letras";
    return null;
  };
  
  export const validateEmail = (email) => {
    if (!email) return "El correo electrónico es obligatorio";
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return "El correo electrónico no es válido";
    return null;
  };
  
  export const validatePhone = (phone) => {
    if (!phone) return "El teléfono es obligatorio";
    if (!/^[0-9]{10}$/.test(phone)) return "El teléfono debe tener 10 dígitos";
    return null;
  };
  
  export const validatePassword = (password) => {
    if (!password) return "La contraseña es obligatoria";
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[0-9a-zA-Z!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!passwordRegex.test(password)) return "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial";
    return null;
  };
  
  export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return "Confirmar la contraseña es obligatorio";
    if (password !== confirmPassword) return "Las contraseñas no coinciden";
    return null;
  };
  
  export const validateSecurityAnswer = (securityAnswer) => {
    if (!securityAnswer) return "La respuesta de seguridad es obligatoria";
    if (securityAnswer.length < 3) return "La respuesta de seguridad debe tener al menos 3 caracteres";
    return null;
  };