import {IUser} from "../../types/UserData/IUser";
import {ISessionService} from "../../types/SessionService/SessionService";
import {SessionBasicInfo, SessionData} from "@shared/types/Session/Session";
import {Session} from "../Session/Session";
import {SCENARIO} from "@shared/types/Game/ScenarioService/SCENARIO";
import {SessionSettings} from "@shared/types/SessionSettings";
import {UserDocument} from "../../Models/User";
import {User} from "../User/User";
import {Player} from "../Player/Player";


export class SessionService implements ISessionService {

    private _activeSessions = new Map<SessionData["id"], SessionData>();

    private _activeUsers = new Map<IUser["id"], IUser>();

    constructor() {

    }

    public createSession(userId: string, settings: SessionSettings) {
        const user = this.getUser(userId);
        const session = new Session(user, settings);
        user.addActiveSession(session);
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


    public closeSession(sessionId: string): void {
        const session = this._activeSessions.get(sessionId);
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
            return this._activeSessions.get(sessionId) || null;
        }
    }

    public addToActiveUsers(userDocument: UserDocument) {
        let user = this._activeUsers.get(userDocument._id.toString());
        if (!user) {
            user = new User(userDocument);
            this._activeUsers.set(user.id, user);
            return user;
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

    private getUser(userId: string): IUser {
        console.log(this._activeUsers)
        console.log("GETTING USER WITH ID", userId);
        const user = this._activeUsers.get(userId);
        console.log("got user", user);
        if (!user) {
            throw new Error("Can't find user with id: " + userId);
        }
        return user;
    }

}
