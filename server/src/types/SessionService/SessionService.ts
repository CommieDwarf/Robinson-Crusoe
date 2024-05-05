import {IUser} from "../UserData/IUser";
import {SessionBasicInfo, SessionData} from "../../shared/types/Session/Session";
import {SessionSettings} from "@shared/types/SessionSettings";
import {UserDocument} from "../../Models/User";

export interface ISessionService {
    createQuickGameSession: (user: string) => SessionData;
    createSession: (userId: string, settings: SessionSettings) => SessionData;

    addToActiveUsers: (userDocument: UserDocument) => void;
    removeFromActiveUsers: (userId: string) => void;
    getSession: (userId: string, sessionId: string) => SessionData | null;

    getPublicSessionList: () => SessionBasicInfo[];

    getQuickGameByUserId(userId: string): SessionData | null;

    closeSession: (sessionId: string) => void;

}
