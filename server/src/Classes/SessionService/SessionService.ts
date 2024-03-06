import {UserData} from "../../types/UserData/UserData";
import {ISessionService} from "../../types/SessionService/SessionService";
import {SessionData} from "../../types/Session/Session";
import {Session} from "../Session/Session";

export class SessionService implements ISessionService {

    private _activeSessions = new Map<string, SessionData>();


    constructor() {

    }

    createSession(user: UserData): SessionData {
        const session = new Session(user);
        user.setSession(session);
        this._activeSessions.set(session.id, session);
        return session;
    }

    public getSession(id: string): SessionData {
        const session = this._activeSessions.get(id);
        if (!session) {
            throw new Error(`Can't find session with id: ${id}`)
        }
        return session;
    }

    public closeSession(sessionId: string) {
        this._activeSessions.delete(sessionId);
    }
}
