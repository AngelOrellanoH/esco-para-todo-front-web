// src/services/CompetenciaService.js
import { API_BASE_URL } from '../config'; 
import { AuthService } from "./auth-service";

export const CompetenciaService = {
  async obtenerTodas() {

    const response = await fetch(`${API_BASE_URL}/competencias`); 
    if (!response.ok) {
      throw new Error("Error al obtener competencias");
    }
    return response.json();
  },

  asignarCompetencias: async (idsCompetencias) => {
    const token = AuthService.getToken();

 
    const response = await fetch(`${API_BASE_URL}/competencias/asignar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(idsCompetencias)
    });
    console.log(response);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al asignar competencias: ${errorText}`);
    }

    return true;
  },
};