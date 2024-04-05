import {IUser} from "../UserData/IUser";
import {SessionData} from "../Session/Session";
import {SessionSettings} from "@shared/types/SessionSettings";

export interface ISessionService {
    createQuickGame: (user: IUser) => SessionData;
    createSession: (user: IUser, settings: SessionSettings) => SessionData;
    getSessionByUserId: (id: string) => SessionData | undefined;
    getSessionById: (id: string) => SessionData;
    closeSession: (sessionId: string) => void;

}
