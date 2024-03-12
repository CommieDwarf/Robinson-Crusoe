import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import {resources} from "./resources";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import {ACTION} from "@shared/types/Game/ACTION";

i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources,
        lng: "pl", // if you're using a language detector, do not define the lng option
        debug: true,
    });


// const d = i18next.t(LOG_CODE.ALL_PLAYERS_GOT_HEALED, {
//     ns: "logMessages",
//     amount: 5
// });


export default i18next;
