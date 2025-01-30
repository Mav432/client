import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://apiback-api.vercel.app/api/security-questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error al obtener las preguntas de seguridad:', error);
      }
    };
    fetchQuestions();
  }, []);

  const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
  };

  const registerUser = async (values) => {
    values.securityAnswer = normalizeString(values.securityAnswer);
    try {
      await signUp(values);
      toast.success('Usuario registrado correctamente');
      setTimeout(() => {
        navigate('/login'); // Redirigir a la página de inicio de sesión
      }, 1000);
    } catch (error) {
      console.error('Error al registrar:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data.errors) {
        error.response.data.errors.forEach(err => {
          toast.error(err.msg); // Mostrar alertas usando react-toastify
        });
      } else {
        toast.error('Error al registrar. Por favor, inténtelo nuevamente');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <ToastContainer />
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Registro</h2>
        <form onSubmit={handleSubmit(registerUser)}>
          <div className="mb-4">
            <label className="block text-gray-300">Nombre de Usuario</label>
            <input
              type="text"
              {...register("username", { required: "El nombre de usuario es obligatorio" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              placeholder="Nombre de Usuario"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Correo Electrónico</label>
            <input
              type="email"
              {...register("email", { required: "El correo electrónico es obligatorio" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              placeholder="Correo Electrónico"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Teléfono</label>
            <input
              type="text"
              {...register("phone", { 
                required: "El teléfono es obligatorio", 
                pattern: {
                  value: /^[0-9]+$/,
                  message: "El teléfono solo puede contener números"
                }
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              placeholder="Teléfono"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-300">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { 
                  required: "La contraseña es obligatoria",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[0-9a-zA-Z!@#$%^&*(),.?":{}|<>]{8,}$/,
                    message: "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número"
                  }
                })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                placeholder="Contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-300">Confirmar Contraseña</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", { 
                  required: "Confirmar la contraseña es obligatorio",
                  validate: value => value === watch('password') || "Las contraseñas no coinciden"
                })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
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
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Pregunta de Seguridad</label>
            <select
              {...register("securityQuestionId", { required: "La pregunta de seguridad es obligatoria" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            >
              <option value="">Seleccione una pregunta</option>
              {Array.isArray(questions) && questions.map((question) => (
                <option key={question.id} value={question.id}>
                  {question.question}
                </option>
              ))}
            </select>
            {errors.securityQuestionId && <p className="text-red-500 text-sm mt-1">{errors.securityQuestionId.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Respuesta de Seguridad</label>
            <input
              type="text"
              {...register("securityAnswer", { required: "La respuesta de seguridad es obligatoria" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              placeholder="Respuesta de Seguridad"
              onInput={(e) => e.target.value = normalizeString(e.target.value)}
            />
            {errors.securityAnswer && <p className="text-red-500 text-sm mt-1">{errors.securityAnswer.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">Registrar</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;