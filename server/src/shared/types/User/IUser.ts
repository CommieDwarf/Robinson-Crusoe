import {SessionData} from "@shared/types/Session/Session";

export interface IUser {
    id: string,
    sockets: any[],
    username: string,
    activeSessions: SessionData[],
    addActiveSession: (session: SessionData) => void;
    removeSession: (sessionId: string) => void;
    leaveLobbies: () => string[] | Promise<string[]>;
    latency: number;
    addSocket: (socket: any) => void;
    getSession: (sessionId: string) => SessionData;
    getPlaceHolder: () => UserPlaceHolder
    onSocketDisconnect: (socket: any, onLobbyLeave?: (sessionIds: string[]) => void) => void;
}

export interface UserPlaceHolder {
    username: string,
    id: string,
}