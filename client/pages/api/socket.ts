import { io } from "socket.io-client";
import {
	ServerPayloadMap,
	SOCKET_EVENT_SERVER,
} from "@shared/types/Requests/Socket";
import config from "../../config/config";
import { socket } from "../../store/store";

export default function createSocketClient() {
	return io(config.SERVER_URL, {
		autoConnect: false,
	});
}

export interface SocketListener {
	off: () => void;
}

export function setSocketListener<E extends keyof ServerPayloadMap>(
	event: E,
	listener: (payload: ServerPayloadMap[E]) => any
): SocketListener {
	function listenerDecorator (payload: ServerPayloadMap[E])  {
		// if (event !== SOCKET_EVENT_SERVER.PLAYER_LATENCY_LIST_SENT &&
		//     event !== SOCKET_EVENT_SERVER.PING &&
		//     event !== SOCKET_EVENT_SERVER.ALERT_SENT &&
		//     event !== SOCKET_EVENT_SERVER.USER_LATENCY_SENT
		// )
		//     alert("Handling event: " + event);
		listener(payload);
	};

	socket.on(event as string, listenerDecorator);

	const off = () => {
		if (socket.hasListeners(event as string)) {
			socket.off(event as string, listenerDecorator);
		} else {
			console.warn(`No listener registered for event ${event}.`);
		}
	};

	return {
		off,
	};
}
