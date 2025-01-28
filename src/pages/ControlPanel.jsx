import React from 'react';
import Navbar from '../components/Navbar';

function ControlPanel() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <h1 className="text-4xl font-bold text-white">Panel de Control</h1>
      </div>
    </div>
  );
}

export default ControlPanel;