import {SessionData} from "@shared/types/Session/Session";
import {Socket} from "socket.io";

export interface IUser {
    id: string,
    sockets: Socket[],
    username: string,
    activeSessions: SessionData[],
    addActiveSession: (session: SessionData) => void;
    removeSession: (sessionId: string) => void;
    leaveLobbies: () => string[] | Promise<string[]>;
    latency: number;
    addSocket: (socket: Socket) => void;
    getSession: (sessionId: string) => SessionData;
    getPlaceHolder: () => UserPlaceHolder
    onSocketDisconnect: (socket: Socket, onLobbyLeave?: (sessionIds: string[]) => void) => void;
}

export interface UserPlaceHolder {
    username: string,
    id: string,
}