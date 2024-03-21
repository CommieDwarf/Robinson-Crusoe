import {Socket} from "socket.io-client";

export function connectSocketWithAuthToken(socket: Socket, authToken: string) {
    if (!authToken) {
        throw new Error("authToken is missing")
    }
    console.log("connecting!");
    socket.io.opts.extraHeaders = {
        Authorization: `${authToken}`,
    };
    socket.connect();
}
