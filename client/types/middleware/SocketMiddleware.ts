import {SOCKET_EVENT_CLIENT, SocketPayloadMap} from "@shared/types/Requests/Socket";
import {SOCKET_CONNECT, SOCKET_DISCONNECT, SOCKET_EMIT} from "../../middleware/socketMiddleware";

type IsRequired<T, K extends keyof T> = T extends T[K] ? false : true;
export type ModifiedPayload<T extends keyof SocketPayloadMap> =
    IsRequired<SocketPayloadMap[T], 'sessionId'> extends true
        ? Omit<SocketPayloadMap[T], 'sessionId'> & { hydrateSessionId: true } | SocketPayloadMap[T]
        : SocketPayloadMap[T]


export interface SocketConnectAction {
    type: typeof SOCKET_CONNECT;
    payload: { authToken: string };
}

export interface SocketDisconnectAction {
    type: typeof SOCKET_DISCONNECT;
}

export interface SocketEmitAction<T extends SOCKET_EVENT_CLIENT> {
    type: typeof SOCKET_EMIT;
    event: T;
    payload: ModifiedPayload<T>;
}


export type SocketActions =
    | SocketConnectAction
    | SocketDisconnectAction
    | SocketEmitAction<SOCKET_EVENT_CLIENT>
