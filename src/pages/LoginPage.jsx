import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function LoginPage() {

  const { isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
      if (isAuthenticated) {
        navigate("/profile");
      }
  }, [isAuthenticated, navigate]);



  const onSubmit = async (values) => {
    try {
      const response = await signIn(values);
      if (response && response.success) {
        toast.success("Inicio de sesión exitoso");
        reset();
        setTimeout(() => {
          navigate("/profile"); // Redirigir a la página de perfil
        }, 1000);
      } else {
        throw new Error(response.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error(
        "Error al iniciar sesión:",
        error.response ? error.response.data : error.message
      );
      if (error.response && error.response.data.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.msg); // Mostrar alertas usando react-toastify
        });
      } else {
        toast.error("Error al iniciar sesión. Por favor, inténtelo nuevamente");
      }
      reset();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#3f3f3f]">
      <ToastContainer />
      <div className="bg-[#121212a5] p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-300">Correo</label>
            <input
              type="email"
              {...register("email", {
                required: "El correo electrónico es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "El correo electrónico no es válido",
                },
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-[#8e8d8d68] text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Contraseña</label>
            <input
              type="password"
              {...register("password", {
                required: "Se requiere contraseña",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 bg-[#8e8d8d68] text-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#313134] text-white py-2 rounded-md hover:bg-[#121212] transition duration-200"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/password-recovery"
            className="text-gray-500 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
