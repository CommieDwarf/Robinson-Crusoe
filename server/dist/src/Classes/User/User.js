"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const SessionConnectError_1 = require("../../Errors/Session/SessionConnectError");
const SESSION_CONNECTION_ERROR_CODE_1 = require("@shared/types/Errors/SESSION_CONNECTION_ERROR_CODE");
class User {
    constructor(userDocument, socket, sessionService) {
        this._sessions = [];
        this._latency = 0;
        this._disconnectTimout = null;
        this._id = userDocument._id.toString();
        this._username = userDocument.username;
        this._sockets = [socket];
        this._sessionService = sessionService;
    }
    get id() {
        return this._id;
    }
    get username() {
        return this._username;
    }
    get activeSessions() {
        return this._sessions;
    }
    get sockets() {
        return this._sockets;
    }
    get latency() {
        return this._latency;
    }
    set latency(value) {
        this._latency = value;
    }
    addActiveSession(session) {
        if (!this._sessions.includes(session)) {
            this._sessions.push(session);
        }
    }
    removeSession(sessionId) {
        this._sessions = this._sessions.filter((session) => session.id !== sessionId);
    }
    leaveLobbies() {
        return this._sessions
            .filter((session) => !session.isGameInProgress)
            .map((session) => {
            return this._sessionService.leaveSession(this, session.id);
        });
    }
    addSocket(socket) {
        if (!this._sockets.includes(socket)) {
            this._sockets.push(socket);
            if (this._disconnectTimout) {
                clearTimeout(this._disconnectTimout);
            }
        }
    }
    onSocketDisconnect(socket, onLobbiesLeave) {
        this.removeSocket(socket);
        if (this._sockets.length === 0) {
            this._disconnectTimout = setTimeout(() => {
                const sessionIds = this.leaveLobbies();
                onLobbiesLeave && onLobbiesLeave(sessionIds);
            }, 5000);
        }
    }
    getSession(sessionId) {
        const session = this._sessions.find((sessionData) => sessionData.id === sessionId);
        if (!session) {
            throw new SessionConnectError_1.SessionConnectError(`Session id: ${sessionId} not found in user's activeSessions`, SESSION_CONNECTION_ERROR_CODE_1.SESSION_CONNECTION_ERROR_CODE.SESSION_NOT_FOUND);
        }
        return session;
    }
    getPlaceHolder() {
        return {
            username: this._username,
            id: this._id
        };
    }
    removeSocket(socket) {
        this._sockets = this._sockets.filter((sct) => sct !== socket);
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map