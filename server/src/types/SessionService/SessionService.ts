import {IUser} from "../UserData/IUser";
import {SessionBasicInfo, SessionData} from "../../shared/types/Session/Session";
import {SessionSettings} from "@shared/types/SessionSettings";
import {UserDocument} from "../../Models/User";
import {Socket} from "socket.io";

export interface ISessionService {
    createQuickGameSession: (user: string) => SessionData;
    createSession: (userId: string, settings: SessionSettings) => SessionData;

    joinSession: (user: IUser, sessionId: string, password: string) => void;

    leaveSession: (user: IUser, sessionId: string) => void;
    addToActiveUsers: (userDocument: UserDocument, socket: Socket) => void;
    removeFromActiveUsers: (userId: string) => void;
    getSession: (userId: string, sessionId: string) => SessionData | null;

    getPublicSessionList: () => SessionBasicInfo[];

    getQuickGameByUserId(userId: string): SessionData | null;

    closeSession: (sessionId: string) => void;

    addMessage: (userId: string, message: string, sessionId: string) => void;

    userInSession: (userId: string, sessionId: string) => boolean

    updateSessionSettings: (userId: string, sessionId: string, settings: Partial<SessionSettings>) => void;
}
