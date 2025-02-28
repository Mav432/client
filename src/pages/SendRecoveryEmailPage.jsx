import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendRecoveryEmailRequest, getUserDetails } from '../api/recovery'; // Asegúrate de que la ruta sea correcta

const SendRecoveryEmailPage = () => {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm();
  const { userId } = useParams(); // Obtener el userId de los parámetros de la URL

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails(userId);
        console.log(response.data.email); // Verificar la respuesta del servidor
        console.log(response.data.name);  // Verificar la respuesta del servidor
        setValue('email', response.data.email);
        setValue('name', response.data.name);
      } catch (error) {
        toast.error('Error al obtener los detalles del usuario');
      }
    };

    fetchUserDetails();
  }, [userId, setValue]);

  const sendRecoveryEmail = async (data) => {
    try {
      await sendRecoveryEmailRequest({ email: data.email, name: data.name, userId });
      toast.success('Correo de recuperación enviado correctamente');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al enviar correo de recuperación');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#3f3f3f]">
      <ToastContainer />
      <div className="bg-[#121212a5] p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Enviar correo electrónico de recuperación</h2>
        <form onSubmit={handleSubmit(sendRecoveryEmail)}>
          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-[#8e8d8d68] text-white"
              readOnly // Hacer que el campo sea de solo lectura
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-[#8e8d8d68] text-white"
              readOnly // Hacer que el campo sea de solo lectura
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <button type="submit" className="w-full bg-[#313134] text-white py-2 rounded-md hover:bg-gray-500 transition duration-200">Enviar correo electrónico de recuperación</button>
        </form>
      </div>
    </div>
  );
};

export default SendRecoveryEmailPage;