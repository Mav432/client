import axios from "axios";

// Crear una instancia de axios con configuración personalizada
const instance = axios.create({
    //baseURL: config.appUrl,
    baseURL: 'https://api-client-three.vercel.app/api', // Establece la URL base para todas las solicitudes
    withCredentials: true // Permite el envío de cookies con las solicitudes
});

// Exportar la instancia para usarla en otros archivos
export default instance;