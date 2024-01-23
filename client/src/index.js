import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './auth/login/login';
import Register from './auth/register/register'
import Dashboard from './dashboard/dashboard';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import AuthProvider from './context/authContext';

const router = createBrowserRouter([
  {
    path: "/",
    element : (
      <AuthProvider>
        <App />
      </AuthProvider>
    )
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    )
  },
  {
    path: "/register",
    element: (
      <AuthProvider>
        <Register />
      </AuthProvider>
    )
  },
  {
    path: "/dashboard",
    element: (
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    )
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
