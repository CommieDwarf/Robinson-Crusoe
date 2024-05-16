import {SOCKET_EMITTER, SocketPayloadMap} from "@shared/types/Requests/Socket";
import {Socket} from "socket.io";


export function pingClient(socket: Socket,
                           timeoutMs: number,
                           interval: number,
                           onPong: (latency: number) => void,
                           onTimeout: () => void,
                           sessionId: string
) {
    let pingInterval: NodeJS.Timeout | null = null;
    let timeoutHandle: NodeJS.Timeout | null = null;

    const handlePong = (payload: SocketPayloadMap[SOCKET_EMITTER.PING]) => {
        if (timeoutHandle && payload.sessionId === sessionId) {
            clearTimeout(timeoutHandle);
            const latency = Date.now() - payload.timestamp;
            onPong(latency);
        }
    };

    const handleTimeout = () => {
        if (pingInterval) {
            clearInterval(pingInterval);
            onTimeout();
            console.log("timed out!")
        }
    };

    const sendPing = () => {
        const timestamp = Date.now();
        timeoutHandle = setTimeout(() => {
            handleTimeout();
        }, timeoutMs);

        socket.once(SOCKET_EMITTER.PONG, handlePong);

        const payload: SocketPayloadMap[SOCKET_EMITTER.PING] = {timestamp, sessionId};
        socket.emit(SOCKET_EMITTER.PING, payload);
    };

    // Start pinging
    pingInterval = setInterval(sendPing, interval);

    // Clean up on disconnect
    socket.on('disconnect', () => {
        if (pingInterval) {
            clearInterval(pingInterval);
        }
        if (timeoutHandle) {
            clearTimeout(timeoutHandle);
        }
    });

    return [pingInterval, timeoutHandle];
}
