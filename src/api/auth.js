import axios from './axios'; // Importa la instancia de axios

export const registerRequest = async (user) => {
  return await axios.post('/register', user); // Usa la instancia de axios para hacer una solicitud POST
};

export const loginRequest = async (user) => {
  return await axios.post('/login', user); // Usa la instancia de axios para hacer una solicitud POST
};

export const logoutRequest = async () => {
  return await axios.post('/logout'); // Usa la instancia de axios para hacer una solicitud POST
};

export const getProfileRequest = async () => {
  return await axios.get('/profile'); // Usa la instancia de axios para hacer una solicitud GET
};