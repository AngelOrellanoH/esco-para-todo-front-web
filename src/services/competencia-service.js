const API_URL = "/api/competencias";
import { AuthService } from "./auth-service";

export const CompetenciaService = {
  async obtenerTodas() {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error("Error al obtener competencias");
    }
    return response.json();
  },

  asignarCompetencias: async (idsCompetencias) => {
    const token = AuthService.getToken();

    const response = await fetch(`${API_URL}/asignar`, {
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
