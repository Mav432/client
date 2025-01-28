import React from "react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-white">
            Perfil
          </h1>
          <p className="text-white">Cargando datos del usuario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Perfil
        </h1>
        <p className="text-white">Nombre de Usuario: {user.username}</p>
        <p className="text-white">Correo Electrónico: {user.email}</p>
      </div>
    </div>
  );
}

export default Profile;