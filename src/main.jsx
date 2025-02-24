// filepath: /c:/Users/hpx36/OneDrive/Documents/5_A/I_4/AppKn/client/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import './index.css'

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
  <AuthProvider>
    <App />
  </AuthProvider>
    
  </BrowserRouter>
);