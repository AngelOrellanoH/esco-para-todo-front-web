// src/services/contactService.js

import { API_BASE_URL } from "../config";

export const setContact = async (form) => {
  try {
    const response = await fetch(`${API_BASE_URL}/form`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const contentType = response.headers.get("content-type");
    const rawBody = await response.text();

    if (!response.ok) {
      let errorMessage = `Error: ${response.status}`;
      try {
        if (contentType && contentType.includes("application/json")) {
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

    if (contentType && contentType.includes("application/json")) {
      return JSON.parse(rawBody);
    } else {
      return rawBody;
    }
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    throw error;
  }
};
