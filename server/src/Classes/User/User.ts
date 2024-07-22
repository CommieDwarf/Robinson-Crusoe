import {IUser} from "../../types/UserData/IUser";
import {UserDocument} from "../../Models/User";
import {SessionData} from "@shared/types/Session/Session";
import {Socket} from "socket.io";
import {ISessionService} from "../../types/SessionService/SessionService";
import {SessionConnectError} from "../../Errors/Session/SessionConnectError";
import {SESSION_CONNECTION_ERROR_CODE} from "@shared/types/Errors/SESSION_CONNECTION_ERROR_CODE";

export class User implements IUser {


    private readonly _id: string
    private readonly _username: string;
    private _activeSessions: SessionData[] = [];
    private _singlePlayerSession: SessionData | null = null;
    private _sockets: Socket[];
    private _ping = 0;
    private readonly _sessionService: ISessionService;


    constructor(userDocument: UserDocument, socket: Socket, sessionService: ISessionService) {
        this._id = userDocument._id.toString();
        this._username = userDocument.username;
        this._sockets = [socket];
        this._sessionService = sessionService;
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

    get sockets() {
        return this._sockets;
    }

    get ping(): number {
        return this._ping;
    }

    set ping(value: number) {
        this._ping = value;
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

    public leaveNotStartedSessions() {
        this._activeSessions
            .filter((session) => !session.isGameInProgress)
            .forEach((session) => {
                // this._sessionService.leaveSession(this, session.id);
            })
    }

    public addSocket(socket: Socket) {
        if (!this._sockets.includes(socket)) {
            this._sockets.push(socket);
        }
    }

    public removeSocket(socket: Socket) {
        this._sockets = this._sockets.filter((sct) => sct !== socket);
        if (this._sockets.length === 0) {
            console.log("LEAVING NOST STARTED SESSIONS")
            this.leaveNotStartedSessions()
        }
    }

    public getSession(sessionId: string) {
        const session = this._activeSessions.find((sessionData) => sessionData.id === sessionId);
        if (!session) {
            throw new SessionConnectError(`Session id: ${sessionId} not found in user's activeSessions`, SESSION_CONNECTION_ERROR_CODE.SESSION_NOT_FOUND);
        }
        return session;
    }
}
