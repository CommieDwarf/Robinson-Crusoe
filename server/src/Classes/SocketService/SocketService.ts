import { ServerPayloadMap, SOCKET_EVENT_SERVER } from '../../shared/types/Requests/Socket';
import { SessionService } from '../SessionService/SessionService';
import {Server, Socket } from "socket.io";
import jwt from 'jsonwebtoken';
import { User } from '../../Models/User';
import { EventHandler } from './EventHandler/EventHandler';
import { config } from '../../config/config';
import { ISessionService } from '@shared/types/SessionService';


export class SocketService {
    private readonly _io: Server;
    private readonly _sessionService: ISessionService;
    

    constructor(io: Server, sessionService: ISessionService) {
        this._io = io;
        this._sessionService = sessionService;
    }


    public startListening() {
        this._io.use(this.authenticateSocket.bind(this));
        this._io.on("connection", this.handleConnection.bind(this));
    }

    
    private async handleConnection(socket: Socket) {
        try {
            const userId = this.getUserIdFromToken(socket.handshake.headers.authorization);
            const userDoc = await User.findById(userId);

            if (!userDoc || !userDoc.emailVerified) {
                socket.disconnect();
                console.warn("no userDoc or mail not verified")
                return;
            }
            console.log("user validated");
            const user = this._sessionService.getOrCreateUser(userDoc, socket);
            const eventHandler = new EventHandler(user, socket, this._io, this._sessionService);
            eventHandler.startListening();
            eventHandler.pingClient();            
            this.socketEmit(socket, SOCKET_EVENT_SERVER.CONNECTED, null);
            
        } catch (error) {
            console.error(error);
        }
    }

    private authenticateSocket(socket: Socket, next: Function) {
        const token = socket.handshake.headers.authorization?.split(" ")[1];
        if (!token) {
            return next(new Error("Authentication error: Token missing"));
        }

        try {
            jwt.verify(token, config.server.jwtSecret);
            next();
        } catch (error) {
            return next(new Error("Authentication error: Invalid token"));
        }
    }


    private socketEmit<E extends keyof ServerPayloadMap>(socket: Socket, event: E, payload: ServerPayloadMap[E]) {
        socket.emit(event, payload);
    }

    private getUserIdFromToken(authorization: string | undefined): string {
        const token = authorization?.split(" ")[1];
        const decoded: any = jwt.verify(token!, config.server.jwtSecret);
        return decoded.userId;
    }
}