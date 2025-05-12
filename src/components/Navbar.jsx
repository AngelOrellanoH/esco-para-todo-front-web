// components/Navbar.jsx
import { useHistory } from 'react-router-dom';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonImg,
} from '@ionic/react';

import logo from '../assests/logo.png';

/*
  Componente funcional Navbar que representa la barra de navegación principal de la aplicación.
*/
const Navbar = () => {
  const history = useHistory(); // Hook para acceder al historial de navegación de React Router.
  const token = sessionStorage.getItem('token'); // Recupera el token de autenticación del sessionStorage.
                                             // Si existe un token, el usuario se considera logueado.

  /*
    Función para manejar el cierre de sesión del usuario.
    Elimina el token del sessionStorage y redirige al usuario a la página de login.
  */
  const handleLogout = () => {
    sessionStorage.removeItem('token'); // Elimina el token del almacenamiento de sesión.
    history.push('/login'); // Redirige al usuario a la ruta '/login'.
  };

  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonImg
            src={logo}
            alt="logo"
            style={{ width: '120px', height: '60px', marginRight: '10px' }}
          />
        </IonButtons>
    
        <IonTitle style={{ fontWeight: 'bold' }}>Esco Para Todos</IonTitle>
       
        <IonButtons slot="end">
        
          <IonButton routerLink="/home">Inicio</IonButton>
          {/*
            Renderizado condicional de los botones de "Registro" y "Login".
            Se muestran solo si no hay un token en sessionStorage (usuario no logueado).
          */}
          {!token && (
            <>
              <IonButton routerLink="/register">Registro</IonButton>
              <IonButton routerLink="/login">Login</IonButton>
            </>
          )}
          {/*
            Renderizado condicional del botón de "Logout".
            Se muestra solo si hay un token en sessionStorage (usuario logueado).
            El atributo 'onClick' llama a la función handleLogout al hacer clic.
            'color="danger"' aplica el color de peligro definido en el tema de Ionic.
          */}
          {token && (
            <IonButton color="danger" onClick={handleLogout}>
              Logout
            </IonButton>
          )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Navbar;