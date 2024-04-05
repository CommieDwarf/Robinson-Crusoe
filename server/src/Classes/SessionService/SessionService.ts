import {IUser} from "../../types/UserData/IUser";
import {ISessionService} from "../../types/SessionService/SessionService";
import {SessionData} from "../../types/Session/Session";
import {Session} from "../Session/Session";
import {SCENARIO} from "@shared/types/Game/ScenarioService/SCENARIO";
import {SessionSettings} from "@shared/types/SessionSettings";


type UserId = string;
type GameSessionId = string;


export class SessionService implements ISessionService {

    private _activeSessions = new Map<GameSessionId, SessionData>();
    private _userGameSessions = new Map<UserId, GameSessionId>(); //userId  gameSessionIds
    constructor() {

    }

    public createSession(user: IUser, settings: SessionSettings) {
        const session = new Session(user, settings);
        this._activeSessions.set(session.id, session);
        this.associateUserWithSession(user._id, session.id);
        return session;
    }

    public createQuickGame(user: IUser): SessionData {
        const session = new Session(user, {
            password: "",
            private: true,
            scenario: SCENARIO.CASTAWAYS,
            maxPlayers: 1
        });
        this._activeSessions.set(session.id, session);
        this.associateUserWithSession(user._id, session.id);
        session.startGame();
        return session;
    }


    public getSessionByUserId(userId: string): SessionData | undefined {
        const sessionId = this._userGameSessions.get(userId);
        if (!sessionId) {
            throw new Error(`User with id: ${userId} doesn't own a session`);
        }
        return this._activeSessions.get(sessionId);
    }

    public getSessionById(sessionId: string): SessionData {
        const session = this._activeSessions.get(sessionId);
        if (!session) {
            throw new Error("Session doesn't exist");
        }
        return session;
    }

    public hasSession(userId: string): boolean {
        return Boolean(this._userGameSessions.get(userId));
    }

    public closeSession(sessionId: string) {
        const session = this.getSessionByUserId(sessionId);
        if (session) {
            session.players.forEach((player) => {
                this.freeUserFromSession(player.user._id);
            })
            this._activeSessions.delete(sessionId);
        }
    }


    private freeUserFromSession(userId: string) {
        let sessions = this._userGameSessions.get(userId);
        if (!sessions) {
            throw new Error(`User ${userId} has no active sessions`);
        }
        this._userGameSessions.delete(userId);
        // sessions = sessions.filter((id) => id !== sessionId);
        // if (sessions.length === 0) {
        //     this._userGameSessions.delete(userId);
        // } else {
        //     this._userGameSessions.set(userId, sessions);
        // }
    }

    private associateUserWithSession(userId: string, gameSessionId: string) {
        this._userGameSessions.set(userId, gameSessionId);
    }
}
