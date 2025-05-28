import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setupIonicReact } from '@ionic/react';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import './index.css';
import "./i18n";

setupIonicReact();
defineCustomElements(window);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);