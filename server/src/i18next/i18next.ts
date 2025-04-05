import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import { join } from 'path';

i18next.use(Backend).init({
  debug: true,
  backend: {
    loadPath: join(__dirname, 'locales/{{lng}}/{{ns}}.json'),
  },
  fallbackLng: 'pl',
  preload: ['pl'],
  ns: ['translation'], // upewnij się, że to pasuje do twoich plików
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false,
  },
}, (err) => {
  if (err) console.error('i18next initialization failed', err);
  else console.log('i18next initialized successfully');
});
export default i18next;
