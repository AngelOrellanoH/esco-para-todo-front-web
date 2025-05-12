import { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAlert,
} from '@ionic/react';
import { loginUsuario } from '../services/usuario-service'; 
import Navbar from '../components/Navbar'; 

/*
  Componente funcional LoginPage que permite a los usuarios iniciar sesión en la aplicación.
*/
const LoginPage = () => {
  // Estados para gestionar el email, la contraseña, el token de respuesta y el estado de la alerta.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar la visibilidad de la alerta

  /*
    Función asíncrona que se llama al intentar iniciar sesión.
  */
  const handleLogin = async () => {
    setError('');
    setToken(''); 
    try {
      // Crea un objeto con las credenciales del usuario.
      const loginData = { email, password };
      // Llama a la función del servicio para iniciar sesión y espera la respuesta.
      const response = await loginUsuario(loginData);

      // Si el inicio de sesión es exitoso, guarda el token en sessionStorage.
      sessionStorage.setItem('token', response.token);

      setToken(response.token); // Actualiza el estado del token para mostrarlo en la alerta.
      setShowAlert(true); // Muestra la alerta de éxito.
    } catch (err) {
      // Si ocurre un error durante el inicio de sesión, actualiza el estado del error y muestra la alerta de error.
      setError(err.message);
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <Navbar />
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value)} />
        </IonItem>
        <IonButton expand="full" onClick={handleLogin}>Iniciar Sesión</IonButton>

        <IonAlert
          isOpen={showAlert}
          header={error ? 'Error' : 'Login exitoso'}
          message={error ? error : `Token: ${token}`}
          buttons={['OK']}
          onDidDismiss={() => setShowAlert(false)} 
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;