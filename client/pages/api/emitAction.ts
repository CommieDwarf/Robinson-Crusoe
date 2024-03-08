import {socket} from "../_app";
import {CHARACTER_CONTROLLER_ACTION, CONTROLLER_ACTION, OTHER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {ActionPayload} from "@shared/types/Game/ActionPayload";
import {ActionArgMap} from "@shared/types/ActionArgMap";

export function emitAction<T extends CONTROLLER_ACTION>(action: T, ...args: ActionArgMap[T]): void {
    console.log("EMIT ACTION")
    console.log(args);
    const payload: ActionPayload = {
        actionType: action,
        arguments: args
    }
    socket.emit("playerAction", payload);
}


