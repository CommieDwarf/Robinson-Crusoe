// import the original type declarations
import "react-i18next";
// import all namespaces (for the default language, only)
import {resources} from "./resources";


// react-i18next versions higher than 11.11.0
declare module "react-i18next" {
    // and extend them!
    interface CustomTypeOptions {
        resources: typeof resources
    }
}
