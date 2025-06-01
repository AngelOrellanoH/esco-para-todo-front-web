// src/services/authService.js

const API_BASE_URL = '/api/auth';
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
      const response = await fetch(`${API_BASE_URL}/register`, {
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

      // El registro devuelve un CrearUsuarioResponse
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

  // Función de Login: ajustada para manejar la respuesta del backend
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
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

      // El login exitoso devuelve un JSON con SOLO el 'token'
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