import axios from './axios'; // Importa la instancia de axios

export const verifyUserRequest = async (usernameOrEmail) => {
  return await axios.post('/verify-user', { usernameOrEmail }); // Usa la instancia de axios para hacer una solicitud POST
};

export const getRecoveryOptionsRequest = async (userId) => {
  return await axios.get(`/options/${userId}`); // Usa la instancia de axios para hacer una solicitud GET
};

export const verifyAnswerRequest = async (data) => {
  return await axios.post('/verify-answer', data); // Usa la instancia de axios para hacer una solicitud POST
};

export const resetPasswordRequest = async (userId, newPassword, confirmPassword) => {
  return await axios.post('/reset-password', { userId, newPassword, confirmPassword }); // Usa la instancia de axios para hacer una solicitud POST
};

export const sendRecoveryEmailRequest = async ({ email, name, userId }) => {
  return await axios.post('/send-recovery-email', { email, name, userId }); // Usa la instancia de axios para hacer una solicitud POST
};

export const getUserDetails = async (userId) => {
  return await axios.get(`/user-details/${userId}`);  // Suponiendo que esta ruta obtiene los detalles del usuario
};

export const getSecurityQuestionRequest = async (userId) => {
  return await axios.get(`/security-question/${userId}`); // Usa la instancia de axios para hacer una solicitud GET
};