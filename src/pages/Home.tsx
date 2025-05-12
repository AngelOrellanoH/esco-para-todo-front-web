import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Home.css';
import Navbar from '../components/Navbar'; 

/*
  Componente funcional Home que representa la página de inicio de la aplicación.
*/
const Home: React.FC = () => {
  return (
    <IonPage>
     
      <Navbar />
     
      <IonHeader>
        <IonToolbar>
          <IonTitle>Vamos con la app</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/*
        IonContent es el área de contenido principal de la página.
        El atributo 'fullscreen' hace que el contenido ocupe toda la pantalla.
      */}
      <IonContent fullscreen>
        {/*
          Este segundo IonHeader con 'collapse="condense"' está destinado a encabezados grandes
          que se colapsan al hacer scroll (común en iOS).
        */}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Ya funciona</IonTitle>
          </IonToolbar>
        </IonHeader>

      </IonContent>
    </IonPage>
  );
};

export default Home;