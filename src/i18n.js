import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files directly to bundle them with Vite
import translationEN from './locales/en/translation.json';
import translationKU from './locales/ku/translation.json';

// Create resources object
const resources = {
  en: {
    translation: translationEN
  },
  ku: {
    translation: translationKU
  }
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languagedetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources, // Inject translations directly here
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    // Check if the language is Kurdish to set RTL
    detection: {
        order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
        caches: ['localStorage', 'cookie'],
    }
  });

export default i18n;
