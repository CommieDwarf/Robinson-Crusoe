import i18next from 'i18next';
import { translation } from "./locales/pl/translation";

const resources = {
  pl: {
    translation
  }
}


i18next.init({
  debug: true,
  resources,
  fallbackLng: 'pl',
  preload: ['pl'],
  ns: ['translation'],
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false,
  },
}, (err) => {
  if (err) console.error('i18next initialization failed', err);
  else console.log('i18next initialized successfully');
});

export default i18next;