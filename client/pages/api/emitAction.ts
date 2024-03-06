import {socket} from "../_app";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {ActionPayload} from "@shared/types/Game/ActionPayload";
import {ActionArgMap} from "@shared/types/ActionArgMap";

export function emitAction<T extends CONTROLLER_ACTION>(action: T, ...args: ActionArgMap[T][]): void {
    const payload: ActionPayload = {
        actionType: action,
        arguments: args
    };

    socket.emit("playerAction", payload);
}


