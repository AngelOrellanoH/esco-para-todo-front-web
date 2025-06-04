// src/services/foro-service.js

import { API_BASE_URL } from "../config";
import { AuthService } from "./auth-service";

/**
 * Obtiene todos los foros disponibles.
 * @returns {Promise<Array>} Una promesa que resuelve con una lista de foros.
 * @throws {Error} Si ocurre un error al cargar los foros.
 */
export const getForos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/foros`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Error al cargar los foros: ${response.status}`
      );
    }

    return await response.json(); // Devuelve los datos de los foros
  } catch (error) {
    console.error("Error al cargar los foros:", error);
    throw error;
  }
};

/**
 * Obtiene un foro específico por su ID.
 * @param {string} id - El ID del foro.
 * @returns {Promise<Object|null>} Una promesa que resuelve con el foro encontrado o null si no existe.
 * @throws {Error} Si ocurre un error al cargar el foro (distinto de 404).
 */
export const getForo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/foros/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Devuelve null si no se encuentra el foro
      }
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Error al cargar el foro: ${response.status}`
      );
    }
    return await response.json(); // Devuelve los datos del foro
  } catch (error) {
    console.error("Error al cargar el foro:", error);
    throw error;
  }
};

/**
 * Obtiene todos los mensajes de un foro específico por su ID.
 * @param {string} id - El ID del foro.
 * @returns {Promise<Array>} Una promesa que resuelve con una lista de mensajes.
 * @throws {Error} Si ocurre un error al cargar los mensajes (distinto de 404).
 */
export const getMensajes = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/foros/${id}/mensajes`);

    if (!response.ok) {
      if (response.status === 404) {
        return []; // Devuelve un array vacío si no hay mensajes o el foro no es encontrado
      }
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Error al cargar los mensajes: ${response.status}`
      );
    }

    return await response.json(); // Devuelve los datos de los mensajes
  } catch (error) {
    console.error("Error al cargar los mensajes:", error);
    throw error;
  }
};

/**
 * Crea un nuevo foro.
 * @param {Object} foroData - Los datos del foro a crear ({ titulo, descripcion }).
 * @returns {Promise<Object>} Una promesa que resuelve con el foro recién creado.
 * @throws {Error} Si ocurre un error al crear el foro o no hay token de autenticación.
 */
export const createForo = async (foroData) => {
  try {
    const token = AuthService.getToken(); // Obtener el token JWT
    if (!token) {
      throw new Error("No hay token de autenticación disponible.");
    }

    const response = await fetch(`${API_BASE_URL}/foros`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Incluir el token JWT
      },
      body: JSON.stringify(foroData), // foroData debe tener { titulo, descripcion }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error al crear el foro: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al crear el foro:", error);
    throw error;
  }
};

/**
 * Suscribe al usuario autenticado a un foro específico.
 * @param {string} foroId - El ID del foro al que suscribirse.
 * @returns {Promise<boolean>} Una promesa que resuelve a `true` si la suscripción fue exitosa.
 * @throws {Error} Si ocurre un error al suscribirse al foro o no hay token de autenticación.
 */
export const subscribeToForo = async (foroId) => {
  // Obtener el token directamente dentro de la función para mayor encapsulación
  const token = AuthService.getToken();
  if (!token) {
    throw new Error("Se requiere un token de autenticación para suscribirse a un foro.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/foros/${foroId}/suscribirse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Envía el token de autenticación
      },
      body: JSON.stringify({}) // Cuerpo vacío, pero necesario si Content-Type es application/json
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("No autorizado para suscribirse. Token inválido o expirado.");
      }
      if (response.status === 404) {
        throw new Error("Foro no encontrado al intentar suscribirse.");
      }
      // Intenta parsear el error del backend, si no puede, usa un mensaje genérico
      const errorData = await response.json().catch(() => ({ message: 'Error desconocido al suscribirse al foro.' }));
      throw new Error(errorData.message || `Error al suscribirse al foro: ${response.status} ${response.statusText}`);
    }

    return true; // La suscripción fue exitosa
  } catch (error) {
    console.error("Error al intentar suscribirse al foro:", error);
    throw error;
  }
};