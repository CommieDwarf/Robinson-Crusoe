import {IUser} from "../../types/UserData/IUser";
import {UserDocument} from "../../Models/User";
import {SessionData} from "../../shared/types/Session/Session";
import {Session} from "../Session/Session";
import {ObjectId} from "mongodb";

export class User implements IUser {


    private readonly _id: string
    private readonly _username: string
    private _activeSessions: SessionData[] = [];
    private _singlePlayerSession: SessionData | null = null;

    constructor(userDocument: UserDocument) {
        console.log("user doc id toString()", userDocument._id.toString());
        this._id = userDocument._id.toString();
        this._username = userDocument.username;
    }


    get id(): string {
        return this._id;
    }

    get username(): string {
        return this._username;
    }

    get activeSessions(): SessionData[] {
        return this._activeSessions;
    }

    get quickGameSession(): SessionData | null {
        return this._singlePlayerSession;
    }

    public addActiveSession(session: SessionData): void {
        if (!this._activeSessions.includes(session)) {
            this._activeSessions.push(session);
        }
    }

    public removeActiveSession(sessionId: string): void {
        this._activeSessions = this._activeSessions.filter((session) => session.id !== sessionId);
    }

    public setQuickGameSession(session: SessionData) {
        this._singlePlayerSession = session;
    }

    public unsetSinglePlayerSession() {
        this._singlePlayerSession = null;
    }
}
