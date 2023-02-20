import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./resources.json";

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: resources,
    lng: "pl", // if you're using a language detector, do not define the lng option
    debug: true,
  });

export default i18next;
