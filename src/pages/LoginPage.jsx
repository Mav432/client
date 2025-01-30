import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await signIn(values);
      toast.success('Inicio de sesión exitoso');
      setTimeout(() => {
        navigate('/profile'); // Redirigir a la página de perfil
      }, 1000);
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data.errors) {
        error.response.data.errors.forEach(err => {
          toast.error(err.msg); // Mostrar alertas usando react-toastify
        });
      } else {
        toast.error('Error al iniciar sesión. Por favor, inténtelo nuevamente');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <ToastContainer />
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-300">Correo</label>
            <input
              type="email"
              {...register("email", { required: "El correo electrónico es obligatorio" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Contraseña</label>
            <input
              type="password"
              {...register("password", { required: "Se requiere contraseña" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">Iniciar Sesión</button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;