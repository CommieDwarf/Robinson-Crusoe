import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";

export interface ActionPayload {
    actionType: CONTROLLER_ACTION,
    arguments: any[],

}
