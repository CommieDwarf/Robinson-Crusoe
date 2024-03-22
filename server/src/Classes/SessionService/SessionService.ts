import {IUser} from "../../types/UserData/IUser";
import {ISessionService} from "../../types/SessionService/SessionService";
import {GAME_SESSION_MODE, SessionData} from "../../types/Session/Session";
import {Session} from "../Session/Session";


type UserId = string;
type GameSessionId = string;

export class SessionService implements ISessionService {

    private _activeSessions = new Map<GameSessionId, SessionData>();
    private _userGameSessions = new Map<UserId, GameSessionId>(); //userId  gameSessionIds
    constructor() {

    }


    public createSession(user: IUser, mode: GAME_SESSION_MODE): SessionData {
        const session = new Session(user, mode);
        this._activeSessions.set(session.id, session);
        this.associateUserWithSession(user._id, session.id);
        if (mode === GAME_SESSION_MODE.QUICK) {
            session.startGame();
        }

        return session;
    }


    public getSessionByUserId(userId: string): SessionData | undefined {
        const sessionId = this._userGameSessions.get(userId);
        if (!sessionId) {
            throw new Error(`User with id: ${userId} doesn't own a session`);
        }
        return this._activeSessions.get(sessionId);
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
