import {IUser} from "../../types/UserData/IUser";
import {ISessionService} from "../../types/SessionService/SessionService";
import {SessionBasicInfo, SessionData} from "@shared/types/Session/Session";
import {Session} from "../Session/Session";
import {SCENARIO} from "@shared/types/Game/ScenarioService/SCENARIO";
import {SessionSettings} from "@shared/types/SessionSettings";
import {UserDocument} from "../../Models/User";
import {User} from "../User/User";
import {SessionConnectError} from "../../Errors/Session/SessionConnectError";
import {SESSION_JOIN_ERROR_CODE} from "@shared/types/Errors/SESSION_JOIN_ERROR_CODE";
import {Socket} from "socket.io";


export class SessionService implements ISessionService {

    private _activeSessions = new Map<SessionData["id"], SessionData>();
    private _activeUsers = new Map<IUser["id"], IUser>();

    constructor() {

    }

    public createSession(userId: string, settings: SessionSettings) {
        const user = this.getUser(userId);
        const session = new Session(user, settings);
        this._activeSessions.set(session.id, session);
        return session;
    }


    public createQuickGameSession(userId: string): SessionData {
        const user = this.getUser(userId);
        const session = new Session(user, {
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
        const session = this.getSession(user.id, sessionId);
        if (!session) {
            throw new SessionConnectError("Can't find session with id: " + sessionId, SESSION_JOIN_ERROR_CODE.SESSION_NOT_FOUND);
        }
        if (session.settings.password !== password) {
            throw new SessionConnectError("Passwords don't match.", SESSION_JOIN_ERROR_CODE.INCORRECT_PASSWORD);
        }

        if (session.players.length >= session.settings.maxPlayers) {
            throw new SessionConnectError("Server is full", SESSION_JOIN_ERROR_CODE.SESSION_FULL);
        }
        session.joinSession(user);
    }

    public leaveSession(user: IUser, sessionId: string) {
        console.log("LEAVING SESSION")
        const session = this.getSession(user.id, sessionId);
        const player = session?.players.find((pl) => pl.user.id === user.id);
        player && session?.leaveSession(player);
        if (session?.players.length === 0) {
            this.closeSession(sessionId);
        }
    }

    public closeSession(sessionId: string): void {
        const session = this._activeSessions.get(sessionId);
        console.log("Closing session!")
        if (!session) {
            return;
        }
        if (!session.settings.quickGame) {
            session.players.forEach((player) => {
                player.user.removeActiveSession(session.id)
            });
        } else {
            session.players[0].user.unsetSinglePlayerSession();
        }
        this._activeSessions.delete(sessionId);
    }

    public getSession(userId: string, sessionId: string): SessionData | null {
        if (sessionId === "quickgame") {
            return this.getQuickGameByUserId(userId);
        } else {
            const session = this._activeSessions.get(sessionId);
            return session || null;
        }
    }

    public addToActiveUsers(userDocument: UserDocument, socket: Socket) {
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

    public getPublicSessionList(): SessionBasicInfo[] {
        return Array.from(this._activeSessions.values())
            .filter((session) => !session.settings.private)
            .map((session) => session.getBasicInfo());
    }

    public userInSession(userId: string, sessionId: string): boolean {
        return this.getSession(userId, sessionId)?.isUserInSession(userId) || false;
    }

    public addMessage(userId: string, message: string, sessionId: string) {
        const session = this.getSession(userId, sessionId);
        if (!session) {
            throw new Error("Session not found");
        }
        session.addMessage(userId, message);
    }

    public updateSessionSettings(userId: string, sessionId: string, settings: Partial<SessionSettings>) {
        const session = this.getSession(userId, sessionId);
        if (!session || session.host.id !== userId) {
            return;
        }
        session.updateSettings(settings);
    }

    public startGame(userId: string, sessionId: string) {
        const session = this.getSession(userId, sessionId);
        if (!session) {
            return;
        }
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

}
