import {Session} from "../../Classes/Session/Session";
import {SessionData} from "@shared/types/Session/Session";
import {Socket} from "socket.io";

export interface IUser {
    id: string,
    sockets: Socket[],
    username: string,
    activeSessions: SessionData[],
    quickGameSession: SessionData | null,
    addActiveSession: (session: Session) => void;
    setQuickGameSession: (session: Session) => void;
    unsetSinglePlayerSession: () => void;
    removeActiveSession: (sessionId: string) => void;
    leaveLobbies: () => void;

    latency: number;
    ping: (onPong: (latency: number) => void, onTimeout: () => void) => void;
    clearPingIntervals: () => void;

    addSocket: (socket: Socket) => void;

    getSession: (sessionId: string) => SessionData;
    closeConnection: (socket: Socket) => void;
}

