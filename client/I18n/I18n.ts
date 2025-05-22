import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";
import { devMode } from "config/config";
i18next
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		// the translations
		// (tip move them in a JSON file and import them,
		// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
		resources,
		lng: "pl", // if you're using a language detector, do not define the lng option
		debug: devMode,
		interpolation: {
			escapeValue: false,
			// eslint-disable-next-line no-unused-vars
			format: function (value, format) {
				if (format === "uppercase") return value.toUpperCase();
				if (format === "lowercase") return value.toLowerCase();
				if (format === "capitalize")
					return `${value
						.substring(0, 1)
						.toUpperCase()}${value.substring(1)}`;
				return value;
			},
		},
	});

// const d = i18next.t(LOG_CODE.ALL_PLAYERS_GOT_HEALED, {
//     ns: "logMessages",
//     amount: 5
// });

export default i18next;
