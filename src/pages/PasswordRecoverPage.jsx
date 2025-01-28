import React, { useEffect, useState } from 'react';
import SendRecoveryEmailPage from './SendRecoveryEmailPage';
import { getUserDetails } from '../api/recovery'; // Asegúrate de que la ruta sea correcta

const PasswordRecoverPage = () => {
  const [userDetails, setUserDetails] = useState({ email: '', name: '' });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails(); // Suponiendo que esta función obtiene los detalles del usuario
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <SendRecoveryEmailPage email={userDetails.email} name={userDetails.name} />
  );
};

export default PasswordRecoverPage;