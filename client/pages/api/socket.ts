import {io} from "socket.io-client"
import {SOCKET_EVENT, SocketPayloadMap} from "@shared/types/Requests/Socket";
import config from "../../config";
import {socket} from "../../store/store";

export default function createSocketClient() {
    return io(config.SERVER_URL, {
        autoConnect: false
    })
}

export interface SocketListener {
    off: () => void;
}

export function setSocketListener<E extends SOCKET_EVENT>(event: E, listener: (payload: SocketPayloadMap[E]) => any): SocketListener {

    socket.on(event as string, listener);

    const off = () => {
        if (socket.hasListeners(event as string)) {
            socket.off(event as string, listener);
        } else {
            console.warn(`No listener registered for event ${event}.`);
        }
    }

    return {
        off,
    }
}
