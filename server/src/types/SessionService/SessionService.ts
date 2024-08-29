import {IUser} from "../UserData/IUser";
import {SessionBasicInfo, SessionData} from "../../shared/types/Session/Session";
import {SessionSettings} from "@shared/types/SessionSettings";
import {UserDocument} from "../../Models/User";
import {Socket} from "socket.io";
import {SaveGameDocument} from "../../Models/SaveGame";

export interface ISessionService {
    createQuickGameSession: (user: string) => SessionData;
    createSession: (userId: string, settings: SessionSettings, loadData?: SaveGameDocument) => SessionData;

    joinSession: (user: IUser, sessionId: string, password: string) => void;
    leaveSession: (user: IUser, sessionId: string) => void;
    getOrCreateUser: (userDocument: UserDocument, socket: Socket) => IUser;
    removeFromActiveUsers: (userId: string) => void;
    findSession: (userId: string, sessionId: string) => SessionData | null;
    findSessionByInvitationCode: (invitationCode: string) => SessionData | undefined;
    generateUniqueInvitationCode: () => string;

    startGame: (userId: string, sessionId: string) => void;

    getPublicSessionList: (userId: string) => SessionBasicInfo[];

    getQuickGameByUserId(userId: string): SessionData | null;

    closeSession: (sessionId: string) => void;

    addMessage: (userId: string, message: string, sessionId: string) => void;

    userInSession: (userId: string, sessionId: string) => boolean

    updateSessionSettings: (userId: string, sessionId: string, settings: Partial<SessionSettings>) => void;
}
