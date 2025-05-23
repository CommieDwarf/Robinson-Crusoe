import { ClientPayloadMap } from "./../../server/src/shared/types/Requests/Socket";

import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { RootState, store } from "../store/store";
import { Socket } from "socket.io-client";
import {
	connectedUpdated,
	connectionLostUpdated,
	latencyUpdated,
} from "../reduxSlices/connection";
import {
	ModifiedPayload,
	SOCKET_ACTION_TYPE,
	SocketAction,
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

export const socketConnect = (payload: {
	authToken: string;
}): SocketConnectAction => ({
	type: SOCKET_ACTION_TYPE.CONNECT,
	payload,
});
export const socketDisconnect = (): SocketDisconnectAction => ({
	type: SOCKET_ACTION_TYPE.DISCONNECT,
});
export const socketEmit = <T extends SOCKET_EVENT_CLIENT>(
	event: T,
	payload: ModifiedPayload<T>
): SocketEmitAction<T> => {
	return {
		type: SOCKET_ACTION_TYPE.EMIT,
		event,
		payload,
	};
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
	(next: Dispatch<SocketAction>) => {
		const emitQueue: SocketEmitAction<SOCKET_EVENT_CLIENT>[] = [];
		let listeners: SocketListener[];

		let connectedUpdatedTimeout: NodeJS.Timeout | null = null;

		return (action: SocketAction) => {
			if (api) {
				switch (action.type) {
					case SOCKET_ACTION_TYPE.CONNECT:
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
									if (connectedUpdatedTimeout) {
										clearTimeout(connectedUpdatedTimeout);
									}
									connectedUpdatedTimeout = null;
									api.dispatch(connectedUpdated(true));
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
							socket.on("disconnect", (reason) => {
								if (reason === "transport error") {
									api.dispatch(connectionLostUpdated(true));
								} else {
									api.dispatch(connectedUpdated(false));
								}
							}),
						];
						try {
							socket.connect();
						} catch (e) {
							console.warn(e);
						}
						break;

					case SOCKET_ACTION_TYPE.DISCONNECT:
						console.log("socket disconnected");
						socket.close();
						listeners.forEach((listener) => listener.off());
						api.dispatch(connectedUpdated(false));
						break;

					case SOCKET_ACTION_TYPE.EMIT:
						if (!socket.connected) {
							emitQueue.push(action);
						}
						socket.emit(
							action.event,
							hydratePayload(action.payload)
						);
						break;
				}
			}

			return next(action);

			function hydratePayload<
				T extends keyof ClientPayloadMap,
				P extends ModifiedPayload<T>
			>(payload: P): ClientPayloadMap[T] {
				if (!payload || typeof payload !== "object") {
					return payload;
				}
				if ("hydrateSessionId" in payload) {
					// const sessionId = api.getState().getState().gameSession.data?.id;
					const state = api.getState() as unknown as RootState;
					const hydrated = {
						...payload,
						sessionId: state.gameSession.sessionId,
					};
					delete hydrated.hydrateSessionId;

					return hydrated;
				}
				return payload;
			}
		};
	};

export default socketMiddleware;
