//FUNCIONES DEL FORMULARIO DE REGISTRO

export const setRegister = async (user) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    const contentType = response.headers.get('content-type');
    const rawBody = await response.text();

    if (!response.ok) {
      let errorMessage = `Error: ${response.status}`;
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
      return JSON.parse(rawBody);
    } else {
      return rawBody;
    }

  } catch (error) {
    console.error('Error al registrar al usuario', error);
    throw error;
  }
};