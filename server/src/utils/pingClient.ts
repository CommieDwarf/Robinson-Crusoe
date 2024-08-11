import {SOCKET_EVENT, SocketPayloadMap} from "@shared/types/Requests/Socket";
import {Socket} from "socket.io";


export function pingClient(socket: Socket,
                           timeoutMs: number,
                           interval: number,
                           onPong: (latency: number) => void,
                           onTimeout: () => void) {
    let pingInterval: NodeJS.Timeout | null = null;
    let timeoutHandle: NodeJS.Timeout | null = null;

    const handlePong = (payload: SocketPayloadMap[SOCKET_EVENT.PING]) => {
        if (timeoutHandle) {
            console.log("received pong from", socket.id);
            clearTimeout(timeoutHandle);
            const latency = Date.now() - payload.timestamp;
            onPong(latency);
        }
    };

    const handleTimeout = () => {
        if (pingInterval) {
            clearInterval(pingInterval);
            onTimeout();
            console.log("timed out!");
        }
    };

    const sendPing = () => {
        console.log("sending ping to", socket.id);
        const timestamp = Date.now();
        timeoutHandle = setTimeout(() => {
            handleTimeout();
        }, timeoutMs);

        socket.off(SOCKET_EVENT.PONG, handlePong); // Usuwanie istniejącego nasłuchiwacza
        socket.once(SOCKET_EVENT.PONG, handlePong); // Dodanie nowego nasłuchiwacza

        const payload: SocketPayloadMap[SOCKET_EVENT.PING] = {timestamp};
        socket.emit(SOCKET_EVENT.PING, payload);
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
        socket.off(SOCKET_EVENT.PONG, handlePong); // Usuwanie nasłuchiwacza przy rozłączeniu
    });

    return [pingInterval, timeoutHandle];
}
