// src/services/OcupacionesService.js
import { API_BASE_URL } from '../config'; 

export const OcupacionesService = {
  async obtenerTodas() {

    const response = await fetch(`${API_BASE_URL}/ocupaciones`); 
    if (!response.ok) {
      throw new Error("Error al obtener las ocupaciones");
    }
    return response.json();
  },

  obtenerCompetencias: async (idOcupacion) => {

    const response = await fetch(`${API_BASE_URL}/ocupaciones/${idOcupacion}/competencias`); 
    if (!response.ok) {
      throw new Error("Error al obtener las competencias de una ocupacion");
    }
    return response.json();
  },
};