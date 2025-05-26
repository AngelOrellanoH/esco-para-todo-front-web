// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'; 
import { AuthService } from '../services/auth-service';

// 1. Crear el Contexto
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// 2. Crear el Proveedor del Contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const initializeAuth = useCallback(async () => {
    setLoading(true);
    const storedToken = AuthService.getToken();
    const storedUser = AuthService.getUserData();

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      setUser(storedUser || { email: 'Usuario' });
    } else {
      AuthService.clearSession();
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const response = await AuthService.login(email, password);
      const newToken = AuthService.getToken();
      setToken(newToken);
      setIsAuthenticated(true);

      const userData = { email: email };
      AuthService.setUserData(userData);
      setUser(userData);

      return response;
    } catch (error) {
      AuthService.clearSession();
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []); 

  const logout = useCallback(() => {
    AuthService.clearSession();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const authContextValue = useMemo(() => {
    return {
      user,
      token,
      isAuthenticated,
      loading,
      login,
      logout,
    };
  }, [user, token, isAuthenticated, loading, login, logout]);

  if (loading) {
    return <div>Cargando sesión...</div>;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};