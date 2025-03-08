import {
	SOCKET_EVENT_CLIENT,
	ClientPayloadMap,
} from "@shared/types/Requests/Socket";

type IsRequired<T, K extends keyof T> = T extends T[K] ? false : true;
export type ModifiedPayload<T extends keyof ClientPayloadMap> = IsRequired<
	ClientPayloadMap[T],
	"sessionId"
> extends true
	?
	| (Omit<ClientPayloadMap[T], "sessionId"> & {
		hydrateSessionId: true;
	})
	| ClientPayloadMap[T]
	: ClientPayloadMap[T];

export enum SOCKET_ACTION_TYPE {
	CONNECT = "connect",
	DISCONNECT = "disconnect",
	EMIT = "emit",
	EMIT_ACTION = "emit action",
}

export interface SocketEmitAction<T extends SOCKET_EVENT_CLIENT> {
	type: SOCKET_ACTION_TYPE.EMIT;
	event: T;
	payload: ClientPayloadMap[T];
}

export interface SocketConnectAction {
	type: SOCKET_ACTION_TYPE.CONNECT;
	payload: {
		authToken: string;
	};
}

export interface SocketDisconnectAction {
	type: SOCKET_ACTION_TYPE.DISCONNECT;
}

export type SocketAction =
	| SocketEmitAction<SOCKET_EVENT_CLIENT>
	| SocketConnectAction
	| SocketDisconnectAction;
