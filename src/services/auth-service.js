// src/services/authService.js

import { API_BASE_URL } from '../config'; // Importa la URL base

const AUTH_ENDPOINT = `${API_BASE_URL}api/auth`; // Endpoint completo al backend
const TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userData'; 

export const AuthService = {

  // --- Funciones para interactuar con sessionStorage ---
  setToken: (token) => {
    sessionStorage.setItem(TOKEN_KEY, token);
  },

  getToken: () => {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  setUserData: (userData) => {
    sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  },

  getUserData: () => {
    const userDataString = sessionStorage.getItem(USER_DATA_KEY);
    return userDataString ? JSON.parse(userDataString) : null;
  },

  clearSession: () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_DATA_KEY);
  },

  isLoggedIn: () => {
    return !!sessionStorage.getItem(TOKEN_KEY);
  },

  // --- Funciones para llamar al Backend ---

  register: async (user) => {
    try {
      const response = await fetch(`${AUTH_ENDPOINT}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      const contentType = response.headers.get('content-type');
      const rawBody = await response.text();

      if (!response.ok) {
        let errorMessage = `Error de registro: ${response.status}`;
        try {
          if (contentType && contentType.includes('application/json')) {
            const json = JSON.parse(rawBody);
            errorMessage = json.message || errorMessage;
          } else {
            errorMessage = rawBody || errorMessage;
          }
        } catch {
          errorMessage = rawBody || errorMessage;
        }
        throw new Error(errorMessage);
      }

      if (contentType && contentType.includes('application/json')) {
        const userData = JSON.parse(rawBody);
        return userData;
      } else {
        return rawBody;
      }

    } catch (error) {
      console.error('Error al registrar al usuario:', error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await fetch(`${AUTH_ENDPOINT}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get('content-type');
      const rawBody = await response.text();

      if (!response.ok) {
        let errorMessage = `Error de inicio de sesión: ${response.status}`;
        try {
          if (contentType && contentType.includes('application/json')) {
            const json = JSON.parse(rawBody);
            errorMessage = json.message || errorMessage;
          } else {
            errorMessage = rawBody || errorMessage;
          }
        } catch {
          errorMessage = rawBody || errorMessage;
        }
        throw new Error(errorMessage);
      }

      if (contentType && contentType.includes('application/json')) {
        const data = JSON.parse(rawBody);
        if (data.token) {
          AuthService.setToken(data.token); 
        }
        return data;
      } else {
        throw new Error('Respuesta inesperada del servidor al iniciar sesión.');
      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  },
};
