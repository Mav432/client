import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getSecurityQuestionRequest, verifyAnswerRequest } from '../api/recovery'; // Asegúrate de que la ruta sea correcta

const VerifyAnswerPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { userId } = useParams(); // Obtiene el userId de los parámetros de la URL
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');

  useEffect(() => {
    const fetchSecurityQuestion = async () => {
      try {
        const response = await getSecurityQuestionRequest(userId);
        setQuestion(response.data.question);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error al obtener la pregunta de seguridad');
      }
    };

    fetchSecurityQuestion();
  }, [userId]);

  const verifyAnswer = async (data) => {
    try {
      await verifyAnswerRequest({ userId, securityAnswer: data.securityAnswer });
      toast.success('Respuesta correcta. Ahora puede restablecer su contraseña.');
      navigate(`/reset-password/${userId}`); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al verificar respuesta');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <ToastContainer />
      <div className="bg-red-500 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">{question}</h2>
        <form onSubmit={handleSubmit(verifyAnswer)}>
          <div className="mb-4">
            <label className="block text-gray-300">Respuesta de seguridad</label>
            <input
              type="text"
              {...register("securityAnswer", { required: "La respuesta de seguridad es obligatoria" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-700 text-white"
              placeholder="Security Answer"
            />
            {errors.securityAnswer && <p className="text-red-500 text-sm mt-1">{errors.securityAnswer.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">Verificar respuesta</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyAnswerPage;