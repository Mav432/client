import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { verifyUserRequest, getRecoveryOptionsRequest } from '../api/recovery'; // Asegúrate de que la ruta sea correcta

const PasswordRecoveryPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [userId, setUserId] = useState(null);
  const [options, setOptions] = useState(null);
  const [userDetails, setUserDetails] = useState({ email: '', name: '' });
  const navigate = useNavigate();

  const verifyUser = async (data) => {
    try {
      const response = await verifyUserRequest(data.usernameOrEmail);
      setUserId(response.data.userId);
      setUserDetails({ email: response.data.email, name: response.data.name });
      const optionsResponse = await getRecoveryOptionsRequest(response.data.userId);
      setOptions(optionsResponse.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al verificar usuario');
    }
  };

  const handleOptionClick = (option) => {
    if (option === 'email') {
      navigate(`/send-recovery-email/${userId}`, { state: { userId, email: userDetails.email, name: userDetails.name } });
    } else if (option === 'security-question') {
      navigate(`/verify-answer/${userId}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <ToastContainer />
      <div className="bg-red-500 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Recuperación de contraseña</h2>
        {!options ? (
          <form onSubmit={handleSubmit(verifyUser)}>
            <div className="mb-4">
              <label className="block text-gray-300">Nombre de usuario o correo electrónico</label>
              <input
                type="text"
                {...register("usernameOrEmail", { required: "Se requiere nombre de usuario o correo electrónico" })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-700 text-white"
              />
              {errors.usernameOrEmail && <p className="text-red-500 text-sm mt-1">{errors.usernameOrEmail.message}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">Verificar usuario</button>
          </form>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4 text-center text-white">Opciones de recuperación</h2>
            <button onClick={() => handleOptionClick('email')} className="w-full bg-blue-600 text-white py-2 rounded-md my-2 hover:bg-blue-700 transition duration-200">
            Recuperar por correo electrónico
            </button>
            <button onClick={() => handleOptionClick('security-question')} className="w-full bg-blue-600 text-white py-2 rounded-md my-2 hover:bg-blue-700 transition duration-200">
            Recuperación mediante pregunta de seguridad
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;