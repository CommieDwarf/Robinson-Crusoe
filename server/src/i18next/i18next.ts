import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import { join } from 'path';

i18next.use(Backend).init({
  backend: {
    loadPath: join(__dirname, 'locales/{{lng}}/{{ns}}.json'),
  },
  fallbackLng: 'pl',
  preload: ['pl'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
