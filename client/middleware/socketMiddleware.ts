import { ClientPayloadMap } from "./../../server/src/shared/types/Requests/Socket";
import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { RootState, store } from "../store/store";
import { Socket } from "socket.io-client";
import { connectedUpdated, latencyUpdated } from "../reduxSlices/connection";
import {
	ModifiedPayload,
	SocketActions,
	SocketConnectAction,
	SocketDisconnectAction,
	SocketEmitAction,
} from "../types/middleware/SocketMiddleware";
import { ActionArgMap } from "@shared/types/ActionArgMap";
import { setSocketListener, SocketListener } from "../pages/api/socket";
import { playerListLatencyUpdated } from "../reduxSlices/gameSession";
import {
	SOCKET_EVENT_CLIENT,
	SOCKET_EVENT_SERVER,
} from "@shared/types/Requests/Socket";

export const SOCKET_CONNECT = "socket connect";
export const SOCKET_DISCONNECT = "socket disconnect";
export const SOCKET_EMIT = "socket emit";
export const SOCKET_EMIT_ACTION = "socket emit action";

export const socketConnect = (payload: {
	authToken: string;
}): SocketConnectAction => ({
	type: SOCKET_CONNECT,
	payload,
});
export const socketDisconnect = (): SocketDisconnectAction => ({
	type: SOCKET_DISCONNECT,
});
export const socketEmit = <T extends SOCKET_EVENT_CLIENT>(
	event: T,
	payload: ModifiedPayload<T>
): SocketEmitAction<T> => {
	if (!event) {
		console.error("event is " + event);
	}

	return {
		type: SOCKET_EMIT,
		event,
		payload,
	}
	
};

export const socketEmitAction = <A extends keyof ActionArgMap>(
	action: A,
	...args: ActionArgMap[A]
) => {
	return socketEmit(SOCKET_EVENT_CLIENT.EXECUTE_PLAYER_ACTION, {
		actionType: action,
		arguments: args,
		hydrateSessionId: true,
	});
};

const socketMiddleware =
	(socket: Socket): Middleware =>
	(api: MiddlewareAPI<Dispatch, typeof store>) =>
	(next: Dispatch<SocketActions>) => {
		const emitQueue: SocketEmitAction<SOCKET_EVENT_CLIENT>[] = [];
		let listeners: SocketListener[];
		

		return (action: any) => {
			if (api) {
				const store = api.getState();

				switch (action.type) {
					case SOCKET_CONNECT:
						socket.io.opts.extraHeaders = {
							Authorization: action.payload.authToken,
						};
						listeners = [
							setSocketListener(
								SOCKET_EVENT_SERVER.CONNECTED,
								() => {
									console.log("Socket connected");
									if (emitQueue.length > 0) {
										emitQueue.forEach((action) => {
											socket.emit(
												action.event,
												hydratePayload(action.payload)
											);
										});
									}
									api.dispatch(connectedUpdated(true));
								}
							),
							setSocketListener(
								SOCKET_EVENT_SERVER.DISCONNECTED,
								() => {
									console.log("Socket disconnected");
									alert("Disconnected");
									api.dispatch(connectedUpdated(false));
								}
							),
							setSocketListener(
								SOCKET_EVENT_SERVER.PING,
								(payload) => {
									api.dispatch(
										socketEmit(
											SOCKET_EVENT_CLIENT.PONG,
											payload
										)
									);
								}
							),
							setSocketListener(
								SOCKET_EVENT_SERVER.USER_LATENCY_SENT,
								(payload) => {
									api.dispatch(
										latencyUpdated(payload.latency)
									);
								}
							),
							setSocketListener(
								SOCKET_EVENT_SERVER.PLAYER_LATENCY_LIST_SENT,
								(payload) => {
									api.dispatch(
										playerListLatencyUpdated(payload.list)
									);
								}
							),
						];
						socket.connect();
						break;

					case "disconnect":
						console.log("socket disconnected")
						socket.close();
						listeners.forEach((listener) => listener.off());
						api.dispatch(connectedUpdated(false));
						break;

					case SOCKET_EMIT:
						if (!socket.connected) {
							emitQueue.push(action);
						}
						socket.emit(
							action.event,
							hydratePayload(action.payload)
						);
						break;

					case SOCKET_EMIT_ACTION:
						if (!socket.connected) {
							emitQueue.push(action);
							socket.emit(
								action.event,
								hydratePayload({
									...action.payload,
									hydrateSessionId: true,
								})
							);
						}
				}
			}

			return next(action);

			function hydratePayload<
				T extends keyof ClientPayloadMap,
				P extends ModifiedPayload<T>
			>(payload: P): ClientPayloadMap[T] {
				if (payload && "hydrateSessionId" in payload) {
					// const sessionId = api.getState().getState().gameSession.data?.id;
					const state = api.getState() as unknown as RootState;
					const hydrated = {
						...payload,
						sessionId: state.gameSession.sessionId,
					}
					delete hydrated.hydrateSessionId;
					
					return hydrated;
				}
				return payload;
			}
		};
	};

export default socketMiddleware;
