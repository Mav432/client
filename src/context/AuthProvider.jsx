import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";
import { registerRequest, loginRequest, logoutRequest, getProfileRequest } from "../api/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if(token) {
        const res = await getProfileRequest();
        setUser(res.data);
        setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchProfile();
  }, []);

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      return { success: true, data: res.data };
    } catch (error) {
      const errorMessage = error.response ? error.response.data.errors : [error.message];
      setErrors(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      return { success: true, data: res.data };
    } catch (error) {
      const errorMessage = error.response ? error.response.data.errors : [error.message];
      setErrors(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const signOut = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        user,
        isAuthenticated,
        loading, // Proporciona el estado de carga
        errors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;