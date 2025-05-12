// src/services/usuario-service.js
import { API_BASE_URL } from '../config'; // Importa la URL base de la API

const AUTH_API_URL = `${API_BASE_URL}/auth`; // Define la ruta base para la autenticación

// Función para registrar un nuevo usuario
export const registrarUsuario = async (usuarioData) => {
  try {
    const response = await fetch(`${AUTH_API_URL}/register`, { // Conecta al endpoint /auth/register
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuarioData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error al registrar usuario: ${response.status}`);
    }

    return await response.json(); // Devuelve los datos del usuario registrado
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

// Función para iniciar sesión (login)
export const loginUsuario = async (loginData) => {
  try {
    const response = await fetch(`${AUTH_API_URL}/login`, { // Conecta al endpoint /auth/login
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error al iniciar sesión: ${response.status}`);
    }

    return await response.json(); // Devuelve la respuesta del login (probablemente un token)
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};