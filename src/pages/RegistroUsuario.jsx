import { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonAlert } from '@ionic/react';
import { registrarUsuario } from '../services/usuario-service';
import Navbar from '../components/Navbar';

/*
  Componente funcional RegistroUsuario que permite a los nuevos usuarios registrarse en la aplicación.
*/
const RegistroUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false); 
  const [alertMessage, setAlertMessage] = useState('');
  const [alertHeader, setAlertHeader] = useState('');

  /*
    Función asíncrona que se llama al intentar registrar un nuevo usuario.
  */
  const handleRegistro = async () => {
    try {
      // Crea un objeto con los datos del nuevo usuario.
      const nuevoUsuario = { nombre, email, password };
      // Llama a la función del servicio para registrar el usuario y espera la respuesta.
      const respuesta = await registrarUsuario(nuevoUsuario);
      // Si el registro es exitoso, actualiza el encabezado y el mensaje de la alerta.
      setAlertHeader('Registro Exitoso');
      setAlertMessage(`Usuario ${respuesta.nombre} registrado correctamente.`);
      setShowAlert(true);
      // Limpia los campos del formulario después del registro exitoso.
      setNombre('');
      setEmail('');
      setPassword('');
    } catch (error) {
      // Si ocurre un error durante el registro, actualiza el encabezado y el mensaje de la alerta de error.
      setAlertHeader('Error de Registro');
      setAlertMessage(error.message || 'Ocurrió un error al registrar el usuario.');
      setShowAlert(true); // Muestra la alerta de error.
    }
  };

  return (
    <IonPage>
      <Navbar />
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Nombre</IonLabel>
          <IonInput type="text" value={nombre} onIonChange={(e) => setNombre(e.detail.value)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value)} />
        </IonItem>
        <IonButton expand="full" onClick={handleRegistro}>Registrar</IonButton>
        <IonAlert
          isOpen={showAlert}
          header={alertHeader} 
          message={alertMessage}
          buttons={['OK']} 
          onDidDismiss={() => setShowAlert(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default RegistroUsuario;