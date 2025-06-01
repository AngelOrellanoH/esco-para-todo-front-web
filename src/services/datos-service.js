const API_BASE_URL = '/api/datos';
const TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userData'; 
import { AuthService } from "./auth-service";
export const DatosService = {

  fetchUserProfile: async () => {
    try {
        const token = AuthService.getToken();
        if (!token) {
            throw new Error("Token no disponible. El usuario no está autenticado.");
        }

        const response = await fetch(`${API_BASE_URL}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const contentType = response.headers.get('content-type');
        const rawBody = await response.text();

        if (!response.ok) {
            let errorMessage = `Error al obtener el perfil: ${response.status}`;
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
            AuthService.setUserData(userData);
            return userData;
        } else {
            throw new Error('Respuesta inesperada del servidor al obtener el perfil.');
        }

    } catch (error) {
        console.error('Error al recuperar el perfil del usuario:', error);
        throw error;
    }
}

};