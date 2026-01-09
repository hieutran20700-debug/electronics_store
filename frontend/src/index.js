import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/AuthProvider';
import {AlertProvider} from  "./contexts/AlertProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </AlertProvider>
  </React.StrictMode>
);

