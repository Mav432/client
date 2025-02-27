import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="bg-red-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">MY APP</Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <p className=" text-gray-300 hover:text-white px-3">Hola, {user.username}</p>
              <Link to="/profile" className="text-gray-300 hover:text-white px-3">Profile</Link>
              <button onClick={handleLogout} className="text-gray-300 hover:text-white px-3">Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white px-3">Iniciar Sesión</Link>
              <Link to="/register" className="text-gray-300 hover:text-white px-3">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;