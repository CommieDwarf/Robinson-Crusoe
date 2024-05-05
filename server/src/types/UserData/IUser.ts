import {SessionData} from "../../shared/types/Session/Session";
import {Session} from "../../Classes/Session/Session";

export interface IUser {
    id: string,
    username: string,
    activeSessions: SessionData[],
    quickGameSession: SessionData | null,
    addActiveSession: (session: Session) => void;
    setQuickGameSession: (session: Session) => void;
    unsetSinglePlayerSession: () => void;
    removeActiveSession: (sessionId: string) => void;

}

