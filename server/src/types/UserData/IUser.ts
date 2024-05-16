import {Session} from "../../Classes/Session/Session";
import {SessionData} from "@shared/types/Session/Session";
import {Socket} from "socket.io";

export interface IUser {
    id: string,
    socket: Socket,
    username: string,
    activeSessions: SessionData[],
    quickGameSession: SessionData | null,
    addActiveSession: (session: Session) => void;
    setQuickGameSession: (session: Session) => void;
    unsetSinglePlayerSession: () => void;
    removeActiveSession: (sessionId: string) => void;
    leaveNotStartedSessions: (callback: (sessionId: string) => void) => void;

    ping: number;

    updateSocket: (socket: Socket) => void;
}

