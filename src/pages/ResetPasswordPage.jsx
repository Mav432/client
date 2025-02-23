import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn';
import zxcvbnTranslations from '../utils/zxcvbnTranslations';
import { resetPasswordRequest } from '../api/recovery'; // Asegúrate de que la ruta sea correcta

const ResetPasswordPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { userId } = useParams(); // Obtiene el userId de los parámetros de la URL
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState(null);

  const newPassword = watch('newPassword', '');

  const resetPassword = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    try {
      await resetPasswordRequest(userId, data.newPassword, data.confirmPassword);
      toast.success('Contraseña restablecida correctamente');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al restablecer la contraseña');
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const result = zxcvbn(password);
    setPasswordStrength(result);
  };

  const getTranslatedFeedback = (feedback) => {
    const translatedFeedback = feedback.map((msg) => zxcvbnTranslations.suggestions[msg] || msg);
    return translatedFeedback.join('. ');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <ToastContainer />
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit(resetPassword)}>
          <div className="mb-4">
            <label className="block text-gray-300">Nueva Contraseña</label>
            <input
              type="password"
              {...register("newPassword", { required: "La nueva contraseña es obligatoria", onChange: handlePasswordChange })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              placeholder="Nueva Contraseña"
            />
            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
            {passwordStrength && (
              <p className={`text-sm mt-1 ${passwordStrength.score < 3 ? 'text-red-500' : 'text-green-500'}`}>
                {passwordStrength.feedback.suggestions.length > 0 ? getTranslatedFeedback(passwordStrength.feedback.suggestions) : 'La contraseña es segura'}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Confirmar Contraseña</label>
            <input
              type="password"
              {...register("confirmPassword", { required: "Confirmar la contraseña es obligatorio" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              placeholder="Confirmar Contraseña"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">Restablecer Contraseña</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;