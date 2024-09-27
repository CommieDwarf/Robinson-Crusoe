import {IUser} from "../../shared/types/User/IUser";
import {UserDocument} from "../../Models/User";
import {SessionData} from "@shared/types/Session/Session";
import {Socket} from "socket.io";
import {ISessionService} from "../../types/SessionService/SessionService";
import {SessionConnectError} from "../../Errors/Session/SessionConnectError";
import {SESSION_CONNECTION_ERROR_CODE} from "@shared/types/Errors/SESSION_CONNECTION_ERROR_CODE";

export class User implements IUser {


    private readonly _id: string
    private readonly _username: string;
    private _sessions: SessionData[] = [];
    private _sockets: Socket[];
    private _latency = 0;
    private readonly _sessionService: ISessionService;
    private _disconnectTimout: NodeJS.Timeout | null = null;



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
        return this._sessions;
    }

    get sockets() {
        return this._sockets;
    }

    get latency(): number {
        return this._latency;
    }

    set latency(value: number) {
        this._latency = value;
    }

    public addActiveSession(session: SessionData): void {
        if (!this._sessions.includes(session)) {
            this._sessions.push(session);
        }
    }

    public removeSession(sessionId: string): void {
        this._sessions = this._sessions.filter((session) => session.id !== sessionId);
    }

    public leaveLobbies(): string[] {
        return this._sessions
            .filter((session) => !session.isGameInProgress)
            .map((session) => {
                return this._sessionService.leaveSession(this, session.id);
            })
    }

    public addSocket(socket: Socket) {
        if (!this._sockets.includes(socket)) {
            this._sockets.push(socket);
            if (this._disconnectTimout) {
                clearTimeout(this._disconnectTimout);
            }
        }
    }

    public onSocketDisconnect(socket: Socket, onLobbiesLeave?: (sessionIds: string[]) => void) {
        this.removeSocket(socket);
        if (this._sockets.length === 0) {
                this._disconnectTimout = setTimeout(() => {
                    const sessionIds = this.leaveLobbies()
                    onLobbiesLeave && onLobbiesLeave(sessionIds);
                }, 5000);
        }
    }

    public getSession(sessionId: string) {
        const session = this._sessions.find((sessionData) => sessionData.id === sessionId);
        if (!session) {
            throw new SessionConnectError(`Session id: ${sessionId} not found in user's activeSessions`, SESSION_CONNECTION_ERROR_CODE.SESSION_NOT_FOUND);
        }
        return session;
    }


    public getPlaceHolder() {
        return {
            username: this._username,
            id: this._id
        }
    }

    private removeSocket(socket: Socket) {
        this._sockets = this._sockets.filter((sct) => sct !== socket);
    }
}
