import { createRoot } from 'react-dom/client'
import React from "react";
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.tsx';


createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  
    <App />
  
</React.StrictMode>

);

