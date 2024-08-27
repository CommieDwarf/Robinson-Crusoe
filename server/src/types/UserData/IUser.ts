import {Session} from "../../Classes/Session/Session";
import {SessionData} from "@shared/types/Session/Session";
import {Socket} from "socket.io";
import {UserPlaceHolder} from "../../Classes/Player/Player";

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
    addSocket: (socket: Socket) => void;
    getSession: (sessionId: string) => SessionData;
    getPlaceHolder: () => UserPlaceHolder
    closeConnection: (socket: Socket) => void;
}

