import React from 'react';
import Navbar from '../components/Navbar';

function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <h1 className="text-4xl font-bold text-white">Bienvenido a AppName</h1>
      </div>
    </div>
  );
}

export default HomePage;