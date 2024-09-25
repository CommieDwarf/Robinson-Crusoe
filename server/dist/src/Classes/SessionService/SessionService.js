"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const Session_1 = require("../Session/Session");
const SCENARIO_1 = require("@shared/types/Game/ScenarioService/SCENARIO");
const User_1 = require("../User/User");
const SessionConnectError_1 = require("../../Errors/Session/SessionConnectError");
const SESSION_CONNECTION_ERROR_CODE_1 = require("@shared/types/Errors/SESSION_CONNECTION_ERROR_CODE");
const session_1 = require("../../shared/config/session");
class SessionService {
    constructor() {
        this._activeSessions = new Map();
        this._activeUsers = new Map();
        setInterval(() => {
            console.log("ACTIVE SESSIONS", this._activeSessions.size);
            console.log("ACTIVE USERS", this._activeUsers.size);
        }, 10000);
    }
    createSession(userId, settings, loadData) {
        const user = this.getUser(userId);
        user.leaveLobbies();
        const session = new Session_1.Session(this, user, settings, loadData);
        this._activeSessions.set(session.id, session);
        return session;
    }
    createQuickGameSession(userId) {
        const session = this.createSession(userId, {
            password: "",
            quickGame: true,
            private: true,
            scenario: SCENARIO_1.SCENARIO.CASTAWAYS,
            maxPlayers: 1,
            name: "quick game",
        });
        session.startGame();
        return session;
    }
    joinSession(user, sessionId, password) {
        const session = this.findSession(sessionId);
        if (!session) {
            throw new SessionConnectError_1.SessionConnectError("Can't find session with id: " + sessionId, SESSION_CONNECTION_ERROR_CODE_1.SESSION_CONNECTION_ERROR_CODE.SESSION_NOT_FOUND);
        }
        if (session.settings.password !== password) {
            throw new SessionConnectError_1.SessionConnectError("Passwords don't match.", SESSION_CONNECTION_ERROR_CODE_1.SESSION_CONNECTION_ERROR_CODE.INCORRECT_PASSWORD);
        }
        if (session.players.length >= session.settings.maxPlayers) {
            throw new SessionConnectError_1.SessionConnectError("Server is full", SESSION_CONNECTION_ERROR_CODE_1.SESSION_CONNECTION_ERROR_CODE.SESSION_FULL);
        }
        session.joinSession(user, session.isLoadMode);
    }
    leaveSession(user, sessionId) {
        const session = this.getSession(sessionId);
        console.log("leaveSession from Service");
        session.leaveSession(user);
        if (session.usersInSession === 0) {
            this.removeSession(session.id);
        }
        return sessionId;
    }
    removeSession(sessionId) {
        const session = this.getSession(sessionId);
        session.onSessionRemove();
        session.players.map((player) => this._activeUsers.get(player.user.id)).forEach((user) => user === null || user === void 0 ? void 0 : user.removeSession(sessionId));
        this._activeSessions.delete(sessionId);
    }
    findSession(sessionId) {
        const session = this._activeSessions.get(sessionId);
        return session || null;
    }
    findSessionByInvitationCode(invitationCode) {
        for (const session of this._activeSessions.values()) {
            if (session.invitationCode === invitationCode) {
                return session;
            }
        }
    }
    getOrCreateUser(userDocument, socket) {
        let user = this._activeUsers.get(userDocument._id.toString());
        if (!user) {
            user = new User_1.User(userDocument, socket, this);
            this._activeUsers.set(user.id, user);
            return user;
        }
        else {
            user.addSocket(socket);
        }
        return user;
    }
    removeFromActiveUsers(userId) {
        this._activeUsers.delete(userId);
    }
    getPublicSessionList(userId) {
        return Array.from(this._activeSessions.values())
            .filter((session) => !session.settings.private && !session.isGameInProgress)
            .filter((session) => !session.isLoadMode ||
            (session.isLoadMode && session.usersPlayerExist(userId)))
            .map((session) => session.getBasicInfo());
    }
    userInSession(userId, sessionId) {
        var _a;
        return (((_a = this.findSession(sessionId)) === null || _a === void 0 ? void 0 : _a.isUserInSession(userId)) ||
            false);
    }
    addMessage(userId, message, sessionId) {
        const session = this.findSession(sessionId);
        if (!session) {
            throw new Error("Session not found");
        }
        session.addMessage(userId, message);
    }
    updateSessionSettings(userId, sessionId, settings) {
        const session = this.findSession(sessionId);
        if (!session || session.host.id !== userId) {
            return;
        }
        session.updateSettings(settings);
    }
    startGame(userId, sessionId) {
        const session = this.getSession(sessionId);
        if (!session.isHost(userId) ||
            !session.canStart() ||
            session.isGameInProgress) {
            return;
        }
        session.startGame();
    }
    getAllUsersFromSession(sessionId) {
        return this.getSession(sessionId).players.map((player) => this._activeUsers.get(player.user.id)).filter((user) => user !== undefined);
    }
    getUser(userId) {
        const user = this._activeUsers.get(userId);
        if (!user) {
            throw new Error("Can't find user with id: " + userId);
        }
        return user;
    }
    getSession(sessionId) {
        const session = this._activeSessions.get(sessionId);
        if (!session) {
            throw new Error("Can't find session with id: " + sessionId);
        }
        return session;
    }
    generateUniqueInvitationCode() {
        let code;
        do {
            code = this.generateInvitationCode(session_1.CONNECT_CODE_LENGTH);
        } while (!this.isInvitationCodeUnique(code));
        return code;
    }
    generateInvitationCode(length) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let sessionCode = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            sessionCode += characters[randomIndex];
        }
        return sessionCode;
    }
    isInvitationCodeUnique(code) {
        return !Array.from(this._activeSessions.values()).find((session) => session.invitationCode === code);
    }
}
exports.SessionService = SessionService;
//# sourceMappingURL=SessionService.js.map