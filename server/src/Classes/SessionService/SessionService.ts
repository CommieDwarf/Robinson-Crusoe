import {IUser} from "../../types/UserData/IUser";
import {ISessionService} from "../../types/SessionService/SessionService";
import {SessionBasicInfo, SessionData} from "@shared/types/Session/Session";
import {Session} from "../Session/Session";
import {SCENARIO} from "@shared/types/Game/ScenarioService/SCENARIO";
import {SessionSettings} from "@shared/types/SessionSettings";
import {UserDocument} from "../../Models/User";
import {User} from "../User/User";
import {SessionConnectError} from "../../Errors/Session/SessionConnectError";
import {SESSION_CONNECTION_ERROR_CODE} from "@shared/types/Errors/SESSION_CONNECTION_ERROR_CODE";
import {Socket} from "socket.io";
import {isUser} from "../../utils/TypeGuards/isUser";
import {SaveGameDocument} from "../../Models/SaveGame";
import { CONNECT_CODE_LENGTH } from "../../config/session";

export class SessionService implements ISessionService {

    private _activeSessions = new Map<SessionData["id"], SessionData>();
    private _activeUsers = new Map<IUser["id"], IUser>();

    constructor() {

    }

    public createSession(userId: string, settings: SessionSettings, loadData?: SaveGameDocument) {
        const user = this.getUser(userId);
        user.leaveLobbies()
        const session = new Session(this, user, settings, loadData);
        this._activeSessions.set(session.id, session);
        return session;
    }


    public createQuickGameSession(userId: string): SessionData {
        const user = this.getUser(userId);
        const session = new Session(this, user, {
            password: "",
            quickGame: true,
            private: true,
            scenario: SCENARIO.CASTAWAYS,
            maxPlayers: 1,
            name: "",
        });
        user.setQuickGameSession(session);
        this._activeSessions.set(session.id, session);
        session.startGame();
        return session;
    }

    public joinSession(user: IUser, sessionId: string, password: string) {
        const session = this.findSession(user.id, sessionId);
        if (!session) {
            throw new SessionConnectError("Can't find session with id: " + sessionId, SESSION_CONNECTION_ERROR_CODE.SESSION_NOT_FOUND);
        }
        if (session.settings.password !== password) {
            throw new SessionConnectError("Passwords don't match.", SESSION_CONNECTION_ERROR_CODE.INCORRECT_PASSWORD);
        }

        if (session.players.length >= session.settings.maxPlayers) {
            throw new SessionConnectError("Server is full", SESSION_CONNECTION_ERROR_CODE.SESSION_FULL);
        }
        // user.leaveLobbies();
        
        session.joinSession(user, session.isLoadMode);
    }

    public leaveSession(user: IUser, sessionId: string) {
        const session = this.findSession(user.id, sessionId);
        const player = session?.players.find((pl) => pl.user.id === user.id);
        player && session?.leaveSession(player);
        if (session?.usersInSession === 0) {
            this.closeSession(sessionId);
        }
    }

    public closeSession(sessionId: string): void {
        const session = this._activeSessions.get(sessionId);
        if (!session) {
            return;
        }
        if (!session.settings.quickGame) {
            session.players.forEach((player) => {
                isUser(player.user) && player.user.removeActiveSession(session.id)
            });
        } else {
            isUser(session.players[0].user) && session.players[0].user.unsetSinglePlayerSession();
        }
        session.closeSession();
        this._activeSessions.delete(sessionId);
    }

    public findSession(userId: string, sessionId: string): SessionData | null {
        if (sessionId === "quickgame") {
            return this.getQuickGameByUserId(userId);
        } else {
            const session = this._activeSessions.get(sessionId);
            return session || null;
        }
    }

    public getOrCreateUser(userDocument: UserDocument, socket: Socket) {
        let user = this._activeUsers.get(userDocument._id.toString());
        if (!user) {
            user = new User(userDocument, socket, this);
            this._activeUsers.set(user.id, user);
            return user;
        } else {
            user.addSocket(socket);
        }
        return user;
    }

    public removeFromActiveUsers(userId: string) {
        this._activeUsers.delete(userId);
    }

    public getQuickGameByUserId(userId: string): SessionData | null {
        return this.getUser(userId).quickGameSession;
    }

    public getPublicSessionList(userId: string): SessionBasicInfo[] {
        return Array.from(this._activeSessions.values())
            .filter((session) => !session.settings.private && !session.isGameInProgress)
            .filter((session) => session.isLoadMode && session.playerInstanceExists(userId))
            .map((session) => session.getBasicInfo());
    }

    public userInSession(userId: string, sessionId: string): boolean {
        return this.findSession(userId, sessionId)?.isUserInSession(userId) || false;
    }

    public addMessage(userId: string, message: string, sessionId: string) {
        const session = this.findSession(userId, sessionId);
        if (!session) {
            throw new Error("Session not found");
        }
        session.addMessage(userId, message);
    }

    public updateSessionSettings(userId: string, sessionId: string, settings: Partial<SessionSettings>) {
        const session = this.findSession(userId, sessionId);
        if (!session || session.host.id !== userId) {
            return;
        }
        session.updateSettings(settings);
    }

    public startGame(userId: string, sessionId: string) {
        const session = this.getSession(sessionId);
        if (!session.isHost(userId) || !session.canStart() || session.isGameInProgress) {
            return;
        }
        session.startGame();
    }


    private getUser(userId: string): IUser {
        const user = this._activeUsers.get(userId);
        if (!user) {
            throw new Error("Can't find user with id: " + userId);
        }
        return user;
    }

    private getSession(sessionId: string) {
        const session = this._activeSessions.get(sessionId);
        if (!session) {
            throw new Error("Can't find session with id: " + sessionId);
        }

        return session;
    }


    public generateUniqueConnectCode() {
        let code: string;
        do {
            code = this.generateConnectCode(CONNECT_CODE_LENGTH);
        } while (!this.isConnectCodeUnique(code))

        return code;
    }

    private generateConnectCode(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let sessionCode = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            sessionCode += characters[randomIndex];
        }
        return sessionCode;
    }

    private isConnectCodeUnique(code: string) {
       return !Array.from(this._activeSessions.values()).find((session) => session.connectCode === code);
    }
}
