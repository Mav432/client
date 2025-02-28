import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn';
import zxcvbnTranslations from '../utils/zxcvbnTranslations';
import { resetPasswordRequest } from '../api/recovery'; // Asegúrate de que la ruta sea correcta
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPasswordPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { userId } = useParams(); // Obtiene el userId de los parámetros de la URL
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const newPassword = watch('newPassword', '');
  const confirmPassword = watch('confirmPassword', '');

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
    <div className="flex items-center justify-center min-h-screen bg-[#3f3f3f]">
      <ToastContainer />
      <div className="bg-[#121212a5] p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit(resetPassword)}>
          <div className="mb-4 relative">
            <label className="block text-gray-300">Nueva Contraseña</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                {...register("newPassword", { required: "La nueva contraseña es obligatoria", onChange: handlePasswordChange })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-[#8e8d8d68] text-white"
                placeholder="Nueva Contraseña"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
            {passwordStrength && (
              <p className={`text-sm mt-1 ${passwordStrength.score < 3 ? 'text-red-500' : 'text-green-500'}`}>
                {passwordStrength.feedback.suggestions.length > 0 ? getTranslatedFeedback(passwordStrength.feedback.suggestions) : 'La contraseña es segura'}
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-300">Confirmar Contraseña</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", { required: "Confirmar la contraseña es obligatorio" })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-[#8e8d8d68] text-white"
                placeholder="Confirmar Contraseña"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            {confirmPassword && confirmPassword !== newPassword && (
              <p className="text-red-500 text-sm mt-1">Las contraseñas no coinciden</p>
            )}
          </div>
          <button type="submit" className="w-full bg-[#313134] text-white py-2 rounded-md hover:bg-gray-500 transition duration-200">Restablecer Contraseña</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;