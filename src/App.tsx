import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonContent,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Home from './publicpages/home/Home';
import RegistroUsuario from './publicpages/registro/RegistroUsuario';
import LoginPage from './publicpages/login/LoginUsuario'; 

/*
  Importaciones de los estilos CSS principales requeridos para que los componentes de Ionic funcionen correctamente.
*/
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/*
  Importación de las variables de tema personalizadas de la aplicación (SASS).
*/
import './theme/variables.scss';

/*
  Función para inicializar Ionic React. Debe ser llamada antes de usar cualquier componente de Ionic.
*/
setupIonicReact();

/*
  Función para aplicar la clase 'dark' o 'light' al body según la preferencia del sistema operativo.
*/
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
document.body.classList.add(prefersDark.matches ? 'dark' : 'light');

/*
  Componente funcional raíz de la aplicación.
*/
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonContent>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/register">
            <RegistroUsuario />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonContent>
    </IonReactRouter>
  </IonApp>
);

export default App;