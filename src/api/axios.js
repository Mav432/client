import axios from "axios";

// Crear una instancia de axios con configuración personalizada
const instance = axios.create({
    //baseURL: 'http://localhost:3000/api',
    baseURL: 'https://apiback-api.vercel.app/api', // Establece la URL base para todas las solicitudes
    withCredentials: true // Permite el envío de cookies con las solicitudes
});

// Exportar la instancia para usarla en otros archivos
export default instance;