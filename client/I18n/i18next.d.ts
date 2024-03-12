import "i18next"
import {resources} from "./resources";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";

type logMsg = Record<"logMessages", LOG_CODE>;


declare module "i18next" {
    // and extend them!
    interface CustomTypeOptions {
        resources: typeof resources["pl"]
    }
}
