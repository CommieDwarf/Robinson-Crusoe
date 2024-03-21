import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";

export interface ActionPayload {

    userId: string
    actionType: CONTROLLER_ACTION,
    arguments: any[],

}
