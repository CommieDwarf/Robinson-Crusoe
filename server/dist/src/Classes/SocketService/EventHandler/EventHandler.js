"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
const Socket_1 = require("@shared/types/Requests/Socket");
const SESSION_CONNECTION_ERROR_CODE_1 = require("@shared/types/Errors/SESSION_CONNECTION_ERROR_CODE");
const SessionConnectError_1 = require("../../../Errors/Session/SessionConnectError");
const ERROR_1 = require("@shared/types/Errors/ERROR");
const isUser_1 = require("../../../utils/TypeGuards/isUser");
const SaveService_1 = require("../../SaveService/SaveService");
const SaveGame_1 = require("../../../Models/SaveGame");
const PayloadSchemas_1 = require("../../../constants/PayloadSchemas");
const config_1 = require("../../../config/config");
class EventHandler {
    constructor(user, socket, io, sessionService) {
        this._pingInterval = null;
        this._timeoutHandle = null;
        this._listeners = new Map();
        this.handlePong = (payload) => {
            if (this._timeoutHandle) {
                clearTimeout(this._timeoutHandle);
                const latency = Date.now() - payload.timestamp;
                this._user.latency = latency;
                this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.USER_LATENCY_SENT, { latency });
            }
        };
        this.handleSaveGame = (payload) => __awaiter(this, void 0, void 0, function* () {
            const session = this.findSession(payload.sessionId);
            if (this.validateSession(session) && session.isHost(this._user.id)) {
                try {
                    yield session.save();
                    this.socketRoomEmit(Socket_1.SOCKET_EVENT_SERVER.GAME_SAVED_STATUS, { success: true }, session.id);
                }
                catch (e) {
                    console.warn(e);
                    this.socketRoomEmit(Socket_1.SOCKET_EVENT_SERVER.GAME_SAVED_STATUS, { success: false }, session.id);
                }
            }
        });
        this.handleDeleteSave = (payload) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield SaveGame_1.SaveGame.deleteOne({
                    hostId: this._user.id,
                    _id: payload.saveId,
                });
                console.log("RESULT", result);
                const saveOverviews = yield SaveService_1.SaveService.getSaveGamesOverview(this._user.id);
                if (saveOverviews) {
                    this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.SAVE_LIST_SENT, {
                        list: saveOverviews,
                    });
                }
                else {
                    console.warn("saveOverviews is " + saveOverviews);
                }
            }
            catch (e) {
                console.warn(e);
            }
        });
        this.handleLoadGame = (payload) => __awaiter(this, void 0, void 0, function* () {
            try {
                const save = yield SaveGame_1.SaveGame.findOne({
                    hostId: this._user.id,
                    _id: payload.saveId,
                });
                if (!save) {
                    this.emitError(ERROR_1.ERROR_CODE.SAVE_NOT_FOUND);
                    return;
                }
                const session = this._sessionService.createSession(this._user.id, save.sessionSettings, save);
                this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.GAME_SESSION_CREATED, {
                    sessionId: session.id,
                });
            }
            catch (e) {
                console.warn(e);
            }
        });
        this.handleSendGameStatus = (payload) => {
            const session = this.findSession(payload.sessionId);
            if (this.validateSession(session)) {
                this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.GAME_STATUS_SENT, {
                    gameStatus: session.gameStatus,
                });
            }
        };
        this.handleSendSaveList = (payload) => __awaiter(this, void 0, void 0, function* () {
            const saves = yield SaveService_1.SaveService.getSaveGamesOverview(this._user.id);
            if (saves) {
                this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.SAVE_LIST_SENT, {
                    list: saves,
                });
            }
        });
        this.handleStartGame = (payload) => {
            const session = this.findSession(payload.sessionId);
            if (this.validateSession(session) && session.isHost(this._user.id)) {
                this._sessionService.startGame(this._user.id, session.id);
                this.socketRoomEmit(Socket_1.SOCKET_EVENT_SERVER.GAME_STARTED, payload, session.id);
            }
            else {
                this.emitError(ERROR_1.ERROR_CODE.HOST_ONLY_ACTION);
            }
        };
        this.handleUpdateSessionSettings = (payload) => {
            const session = this.findSession(payload.sessionId);
            if (this.validateSession(session) && session.isHost(this._user.id)) {
                if (session.isGameInProgress) {
                    this.emitError(ERROR_1.ERROR_CODE.LOBBY_ONLY_ACTION);
                    return;
                }
                this._sessionService.updateSessionSettings(this._user.id, payload.sessionId, payload.settings);
                this.emitSessionChanged(session.id);
            }
            else {
                this.emitError(ERROR_1.ERROR_CODE.HOST_ONLY_ACTION);
            }
        };
        this.handleSendMessage = (payload) => {
            const session = this.findSession(payload.sessionId);
            if (this.validateSession(session)) {
                this._sessionService.addMessage(this._user.id, payload.message, payload.sessionId);
                this.emitSessionChanged(session.id);
            }
        };
        this.handleKickPlayer = (payload) => {
            const session = this.findSession(payload.sessionId);
            if (this.validateSession(session) && session.isHost(this._user.id)) {
                if (session.isGameInProgress) {
                    this.emitError(ERROR_1.ERROR_CODE.LOBBY_ONLY_ACTION);
                    return;
                }
                const kickedPlayer = session.players.find((pl) => pl.id === payload.playerId);
                if (kickedPlayer) {
                    if (session.isHost(kickedPlayer === null || kickedPlayer === void 0 ? void 0 : kickedPlayer.user.id)) {
                        return;
                    }
                    session.kickPlayer(kickedPlayer.id);
                    if ((0, isUser_1.isUser)(kickedPlayer.user)) {
                        kickedPlayer.user.sockets.forEach((socket) => {
                            socket.leave(session.id);
                            socket.emit(Socket_1.SOCKET_EVENT_SERVER.PLAYER_KICKED);
                        });
                    }
                    this.emitSessionChanged(session.id);
                    this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.SESSION_LIST_CHANGED, null);
                }
            }
            else {
                this.emitError(ERROR_1.ERROR_CODE.HOST_ONLY_ACTION);
            }
        };
        this.handleSetPlayerReady = (payload) => {
            const session = this.findSession(payload.sessionId);
            if (this.validateSession(session)) {
                session.setPlayerReady(this._user.id, payload.value);
                this.emitSessionChanged(session.id);
            }
        };
        this.handleChangePlayerColor = (payload) => {
            const session = this.findSession(payload.sessionId);
            if (this.validateSession(session)) {
                session.assignColor(this._user.id, payload.color);
                this.emitSessionChanged(session.id);
            }
        };
        this.handleChangeCharacter = (payload) => {
            const session = this.findSession(payload.sessionId);
            if (this.validateSession(session) && !session.isGameInProgress) {
                session.changeCharacter(this._user.id, payload.character);
                this.emitSessionChanged(session.id);
            }
        };
        this.handleLeaveSession = (payload) => {
            const session = this.findSession(payload.sessionId);
            if (this.validateSession(session)) {
                const users = this._sessionService.getAllUsersFromSession(session.id);
                this._sessionService.leaveSession(this._user, payload.sessionId);
                this._socket.leave(payload.sessionId);
                this.emitGameInProgressListChanged(users);
                this.emitSessionChanged(session.id);
                this.emitSessionListChanged();
            }
        };
        this.handleJoinSession = (payload) => {
            try {
                const session = this.findSession(payload.sessionId);
                if (!session) {
                    this.emitConnectionError(SESSION_CONNECTION_ERROR_CODE_1.SESSION_CONNECTION_ERROR_CODE.SESSION_NOT_FOUND);
                    return;
                }
                let password = payload.password;
                if (session.usersPlayerExist(this._user.id)) {
                    password = session.settings.password;
                    ;
                }
                this._sessionService.joinSession(this._user, payload.sessionId, password);
                this._socket.join(session.id);
                this.emitSessionChanged(session.id);
                this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.JOIN_SESSION_RESPONSE, {
                    sessionId: payload.sessionId,
                });
                this.emitSessionChanged(session.id);
                this.emitGameInProgressListChanged(this._sessionService.getAllUsersFromSession(session.id));
                this.emitSessionListChanged();
            }
            catch (error) {
                if (error instanceof SessionConnectError_1.SessionConnectError) {
                    this.emitConnectionError(error.code);
                }
                else {
                    throw error;
                }
            }
        };
        this.handlePlayerAction = (actionData) => {
            const session = this.findSession(actionData.sessionId);
            if (this.validateSession(session)) {
                session.handleAction(this._user.id, actionData.actionType, ...actionData.arguments);
                this.emitSessionChanged(session.id);
            }
        };
        this.handleSendSessionData = (payload) => {
            const session = this.findSession(payload.sessionId);
            if (this.validateSession(session)) {
                if (!this._socket.rooms.has(session.id)) {
                    this._socket.join(session.id);
                }
                this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.SESSION_DATA_SENT, {
                    sessionData: session.getRenderData(this._user.id),
                });
            }
        };
        this.handleSendSessionList = () => {
            const sessionList = this._sessionService.getPublicSessionList(this._user.id);
            this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.SESSION_LIST_SENT, { sessionList });
        };
        this.handlCreateQuickGame = () => {
            const session = this._sessionService.createQuickGameSession(this._user.id);
            this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.GAME_SESSION_CREATED, {
                sessionId: session.id,
            });
        };
        this.handleCreateSession = (payload) => {
            try {
                const settings = Object.assign(Object.assign({}, payload.settings), { quickGame: false });
                const session = this._sessionService.createSession(this._user.id, settings);
                this._socket.join(session.id);
                if (!session.settings.private) {
                    this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.SESSION_LIST_CHANGED, null);
                }
                this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.GAME_SESSION_CREATED, {
                    sessionId: session.id,
                });
            }
            catch (e) {
                console.error("Failed to create session:", e);
            }
        };
        this._socket = socket;
        this._sessionService = sessionService;
        this._user = user;
        this._io = io;
        this._eventMap = this.initEventMap();
    }
    startListening() {
        Object.values(Socket_1.SOCKET_EVENT_CLIENT).forEach((event) => {
            const dispatch = (payload) => {
                this.dispatchEvent(event, payload);
            };
            this._socket.on(event, dispatch);
            this._listeners.set(event, dispatch);
        });
    }
    stopListening() {
        this._listeners.forEach((listener, event) => {
            this._socket.off(event, listener);
        });
    }
    pingClient() {
        if (this._pingInterval) {
            clearInterval(this._pingInterval);
        }
        const handleTimeout = () => {
            if (this._pingInterval) {
                clearInterval(this._pingInterval);
            }
        };
        const sendPing = () => {
            const timestamp = Date.now();
            this._timeoutHandle = setTimeout(() => {
                handleTimeout();
            }, config_1.config.ping.timeout);
            const payload = {
                timestamp,
            };
            this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.PING, payload);
        };
        this._pingInterval = setInterval(sendPing, config_1.config.ping.frequency);
    }
    dispatchEvent(event, payload) {
        const { error } = this.validateData(event, payload);
        if (!error) {
            const handler = this._eventMap.get(event);
            if (handler) {
                if (event !== Socket_1.SOCKET_EVENT_CLIENT.PONG) {
                    console.log("handling event: ", event);
                }
                handler.call(this, payload);
            }
            else {
                console.warn(`No handler found for event: ${event}`);
            }
        }
        else {
            console.warn(`Validation failed for event: ${event}`);
            console.warn(error);
            this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.ERROR_SENT, {
                code: ERROR_1.ERROR_CODE.INVALID_PAYLOAD,
                message: error.details.toString(),
            });
        }
    }
    handleSendGameInProgressList(payload) {
        const games = this._user.activeSessions.map((session) => session.getBasicInfo());
        this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.GAME_IN_PROGRESS_LIST_SENT, {
            sessionList: games,
        });
    }
    handleDisconnect() {
        if (this._pingInterval) {
            clearInterval(this._pingInterval);
        }
        if (this._timeoutHandle) {
            clearTimeout(this._timeoutHandle);
        }
        this.stopListening();
        this._user.onSocketDisconnect(this._socket, (sessionIds) => {
            sessionIds.forEach((sessionId) => {
                this.emitSessionChanged(sessionId);
            });
        });
    }
    handleJoinGameByCode(payload) {
        const session = this._sessionService.findSessionByInvitationCode(payload.code);
        this.handleJoinSession({
            sessionId: (session === null || session === void 0 ? void 0 : session.id) || "unknown",
            password: payload.password,
        });
    }
    socketEmit(event, payload, emitter) {
        if (emitter) {
            emitter.emit(event, payload);
        }
        else {
            this._socket.emit(event, payload);
        }
    }
    socketRoomEmit(event, payload, sessionId) {
        this._io.to(sessionId).emit(event, payload);
    }
    findSession(sessionId) {
        return this._sessionService.findSession(sessionId);
    }
    emitError(code, message = "") {
        console.warn(code);
        this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.ERROR_SENT, {
            code,
            message,
        });
    }
    emitConnectionError(code) {
        console.warn(code);
        this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.SESSION_CONNECTION_STATUS_SENT, {
            error: code,
        });
    }
    validateSession(session) {
        if (!session) {
            this.emitConnectionError(SESSION_CONNECTION_ERROR_CODE_1.SESSION_CONNECTION_ERROR_CODE.SESSION_NOT_FOUND);
            console.warn("session not found");
            return false;
        }
        if (!session.isUserInSession(this._user.id)) {
            this.emitConnectionError(SESSION_CONNECTION_ERROR_CODE_1.SESSION_CONNECTION_ERROR_CODE.ACCESS_DENIED);
            console.warn("user not in session");
            return false;
        }
        return true;
    }
    validateData(event, payload) {
        const schema = PayloadSchemas_1.ClientPayloadSchemas[event];
        return schema.validate(payload);
    }
    emitSessionChanged(sessionId) {
        this.socketRoomEmit(Socket_1.SOCKET_EVENT_SERVER.SESSION_CHANGED, { sessionId }, sessionId);
    }
    emitGameInProgressListChanged(users) {
        users.forEach((user) => {
            user.sockets.forEach((socket) => {
                this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.GAME_IN_PROGRESS_LIST_CHANGED, null, socket);
            });
        });
    }
    emitSessionListChanged() {
        this.socketEmit(Socket_1.SOCKET_EVENT_SERVER.SESSION_LIST_CHANGED, null, this._io);
    }
    initEventMap() {
        return new Map(Object.entries({
            [Socket_1.SOCKET_EVENT_CLIENT.CREATE_QUICK_GAME]: this.handlCreateQuickGame,
            [Socket_1.SOCKET_EVENT_CLIENT.CREATE_SESSION]: this.handleCreateSession,
            [Socket_1.SOCKET_EVENT_CLIENT.SEND_SESSION_DATA]: this.handleSendSessionData,
            [Socket_1.SOCKET_EVENT_CLIENT.EXECUTE_PLAYER_ACTION]: this.handlePlayerAction,
            [Socket_1.SOCKET_EVENT_CLIENT.JOIN_SESSION]: this.handleJoinSession,
            [Socket_1.SOCKET_EVENT_CLIENT.JOIN_SESSION_BY_CODE]: this.handleJoinGameByCode,
            [Socket_1.SOCKET_EVENT_CLIENT.LEAVE_SESSION]: this.handleLeaveSession,
            [Socket_1.SOCKET_EVENT_CLIENT.CHANGE_CHARACTER]: this.handleChangeCharacter,
            [Socket_1.SOCKET_EVENT_CLIENT.CHANGE_PLAYER_COLOR]: this.handleChangePlayerColor,
            [Socket_1.SOCKET_EVENT_CLIENT.SET_PLAYER_READY]: this.handleSetPlayerReady,
            [Socket_1.SOCKET_EVENT_CLIENT.KICK_PLAYER]: this.handleKickPlayer,
            [Socket_1.SOCKET_EVENT_CLIENT.SEND_MESSAGE]: this.handleSendMessage,
            [Socket_1.SOCKET_EVENT_CLIENT.UPDATE_SESSION_SETTINGS]: this.handleUpdateSessionSettings,
            [Socket_1.SOCKET_EVENT_CLIENT.START_GAME]: this.handleStartGame,
            [Socket_1.SOCKET_EVENT_CLIENT.SEND_SAVE_LIST]: this.handleSendSaveList,
            [Socket_1.SOCKET_EVENT_CLIENT.SEND_GAME_STATUS]: this.handleSendGameStatus,
            [Socket_1.SOCKET_EVENT_CLIENT.LOAD_SAVE]: this.handleLoadGame,
            [Socket_1.SOCKET_EVENT_CLIENT.DELETE_SAVE]: this.handleDeleteSave,
            [Socket_1.SOCKET_EVENT_CLIENT.SAVE_GAME]: this.handleSaveGame,
            [Socket_1.SOCKET_EVENT_CLIENT.PONG]: this.handlePong,
            [Socket_1.SOCKET_EVENT_CLIENT.SEND_SESSION_LIST]: this.handleSendSessionList,
            disconnect: this.handleDisconnect,
            [Socket_1.SOCKET_EVENT_CLIENT.SEND_GAME_IN_PROGRESS_LIST]: this.handleSendGameInProgressList,
        }));
    }
}
exports.EventHandler = EventHandler;
//# sourceMappingURL=EventHandler.js.map