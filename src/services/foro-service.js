//FUNCIONES DEL FORO

//TRAER TODOS LOS FOROS
export const getForos = async () => {
  try {
    const response = await fetch(`/api/foros`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error al cargar los foros: ${response.status}`);
    }

    return await response.json(); // Devuelve los datos de los foros
  } catch (error) {
    console.error('Error al cargar los foros:', error);
    throw error;
  }
};


//TRAER UN LOS FOROS ESPECIFICO
export const getForo = async (id) => {
  try {
    const response = await fetch(`/api/foros/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error al cargar el foro: ${response.status}`);
    }
    
    return await response.json(); // Devuelve los datos de los foro
  } catch (error) {
    console.error('Error al cargar el foro:', error);
    throw error;
  }
};

//TRAER TODOS LOS MENSAJES DE UN FORO ESPECIFICO
export const getMensajes = async (id) => {
  try {
    const response = await fetch(`/api/foros/${id}/mensajes`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error al cargar los mensajes: ${response.status}`);
    }

    return await response.json(); // Devuelve los datos de los mensajes
  } catch (error) {
    console.error('Error al cargar los mensajes:', error);
    throw error;
  }
};