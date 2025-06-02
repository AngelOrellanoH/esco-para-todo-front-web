// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Ingles
import commonEN from "./locales/en/common.json";
import aboutEN from "./locales/en/about.json";
import contactEN from "./locales/en/contact.json";
import forosEN from "./locales/en/foros.json";
import homeEN from "./locales/en/home.json";
import loginEN from "./locales/en/login.json";
import registerEN from "./locales/en/register.json";
import profileEN from "./locales/en/perfil.json";

// Espaniol
import commonES from './locales/es/common.json';
import aboutES from './locales/es/about.json';
import contactES from './locales/es/contact.json';
import forosES from './locales/es/foros.json';
import homeES from './locales/es/home.json';
import loginES from './locales/es/login.json';
import registerES from './locales/es/register.json';
import profileES from './locales/es/perfil.json'; 
// Portugues
import commonPT from './locales/pt/common.json';
import aboutPT from './locales/pt/about.json';
import contactPT from './locales/pt/contact.json';
import forosPT from './locales/pt/foros.json';
import homePT from './locales/pt/home.json';
import loginPT from './locales/pt/login.json';
import registerPT from './locales/pt/register.json';
import profilePT from './locales/pt/perfil.json';


const resources = {
  en: {
    common: commonEN,
    about: aboutEN,
    contact: contactEN,
    foros: forosEN,
    home: homeEN,
    login: loginEN,
    register: registerEN,
    profile: profileEN, 
  },
  es: {
    common: commonES,
    about: aboutES,
    contact: contactES,
    foros: forosES,
    home: homeES,
    login: loginES,
    register: registerES,
    profile: profileES,
  },
  pt: {
    common: commonPT,
    about: aboutPT,
    contact: contactPT,
    foros: forosPT,
    home: homePT,
    login: loginPT,
    register: registerPT,
    profile: profilePT, 
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
        order: ['queryString', 'cookie', 'localStorage', 'navigator'],
        caches: ['localStorage']
    },
    ns: ['common', 'about', 'contact', 'foros', 'home', 'login', 'register', 'profile'], 
    defaultNS: 'common'
  });

export default i18n;