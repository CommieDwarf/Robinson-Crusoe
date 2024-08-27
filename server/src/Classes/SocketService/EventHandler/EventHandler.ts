import {
	ClientPayloadMap,
} from "./../../../shared/types/Requests/Socket";
import { Server, Socket } from "socket.io";
import { ISessionService } from "../../../types/SessionService/SessionService";
import { IUser } from "../../../types/UserData/IUser";
import {
	ServerPayloadMap,
	SOCKET_EVENT_CLIENT,
	SOCKET_EVENT_SERVER,
} from "@shared/types/Requests/Socket";
import { SESSION_CONNECTION_ERROR_CODE } from "@shared/types/Errors/SESSION_CONNECTION_ERROR_CODE";
import { SessionData } from "@shared/types/Session/Session";
import { SessionConnectError } from "../../../Errors/Session/SessionConnectError";
import { ERROR_CODE } from "@shared/types/Errors/ERROR";
import { isUser } from "../../../utils/TypeGuards/isUser";
import { SaveService } from "../../SaveService/SaveService";
import { SaveGame } from "../../../Models/SaveGame";
import { PING_FREQUENCY, PING_TIMEOUT } from "../../../config/connection";
import { ClientPayloadSchemas } from "../../../constants/PayloadSchemas";

export class EventHandler {
	private readonly _socket: Socket;
	private readonly _sessionService: ISessionService;
	private readonly _user: IUser;
	private readonly _io: Server;

	private readonly _eventMap;
	private _pingInterval: NodeJS.Timeout | null = null;
	private _timeoutHandle: NodeJS.Timeout | null = null;
	private _listeners = new Map();

	constructor(
		user: IUser,
		socket: Socket,
		io: Server,
		sessionService: ISessionService
	) {
		this._socket = socket;
		this._sessionService = sessionService;
		this._user = user;
		this._io = io;
		this._eventMap = this.initEventMap();
	}

	public startListening() {
		Object.values(SOCKET_EVENT_CLIENT).forEach((event) => {
			const dispatch = (payload: ClientPayloadMap) => {
				this.dispatchEvent(event, payload);
			}
			this._socket.on(event as string, dispatch);
			this._listeners.set(event, dispatch);
		});
	}

	private stopListening() {
		this._listeners.forEach((listener, event) => {
			this._socket.off(event, listener);
		})
	}

	public pingClient() {
		if (this._pingInterval) {
			clearInterval(this._pingInterval);
		}
	
		const handleTimeout = () => {
			if (this._pingInterval) {
				clearInterval(this._pingInterval);
				console.log("timed out!");
			}
		};
		const sendPing = () => {
			const timestamp = Date.now();
			this._timeoutHandle = setTimeout(() => {
				handleTimeout();
			}, PING_TIMEOUT);
			const payload: ServerPayloadMap[SOCKET_EVENT_SERVER.PING] = {
				timestamp,
			};
			this.socketEmit(SOCKET_EVENT_SERVER.PING, payload);
		};

		this._pingInterval = setInterval(sendPing, PING_FREQUENCY);
	}

	private dispatchEvent<E extends keyof ClientPayloadMap>(
		event: E,
		payload: ClientPayloadMap[E]
	) {
		const { error } = this.validateData(event, payload);
		
		if (!error) {
			const handler = this._eventMap.get(event);
			if (handler) {
				console.log("handling event ", event);
				handler.call(this, payload);
			} else {
				console.warn(`No handler found for event: ${event}`);
			}
		} else {
			console.warn(`Validation failed for event: ${event}`);
			console.warn(error);
			this.socketEmit(SOCKET_EVENT_SERVER.ERROR_SENT, {
				code: ERROR_CODE.INVALID_PAYLOAD,
				message: error.details.toString(),
			});
		}
	}

	

	private handlePong = (
		payload: ClientPayloadMap[SOCKET_EVENT_CLIENT.PONG]
	) => {
		if (this._timeoutHandle) {
			clearTimeout(this._timeoutHandle);
			const latency = Date.now() - payload.timestamp;
			this._user.latency = latency;
			this.socketEmit(SOCKET_EVENT_SERVER.USER_LATENCY_SENT, {latency});
		}
	};

	private handleDisconnect() {
		if (this._pingInterval) {
			clearInterval(this._pingInterval);
		}
		if (this._timeoutHandle) {
			clearTimeout(this._timeoutHandle);
		}
		this.stopListening();
		this._user.closeConnection(this._socket);
		this._socket.disconnect();
	}



	private handleSaveGame = async (
		payload: ClientPayloadMap[SOCKET_EVENT_CLIENT.SAVE_GAME]
	) => {
		const session = this.findSession(payload.sessionId);
		if (this.validateSession(session)) {
			session.save();
		}
	};

	private handleDeleteSave = async (
		payload: ClientPayloadMap[SOCKET_EVENT_CLIENT.DELETE_SAVE]
	) => {
		try {
			const result = await SaveGame.deleteOne({
				hostId: this._user.id,
				_id: payload.saveId,
			});

			console.log("RESULT", result);

			const saveOverviews = await SaveService.getSaveGamesOverview(
				this._user.id
			);
			if (saveOverviews) {
				this.socketEmit(SOCKET_EVENT_SERVER.SAVE_LIST_SENT, {
					list: saveOverviews,
				});
			} else {
				console.warn("saveOverviews is " + saveOverviews);
			}
		} catch (e) {
			console.warn(e);
		}
	};

	private handleLoadGame = async (
		payload: ClientPayloadMap[SOCKET_EVENT_CLIENT.LOAD_SAVE]
	) => {
		try {
			const save = await SaveGame.findOne({
				hostId: this._user.id,
				_id: payload.saveId,
			});
			if (!save) {
				this.emitError(ERROR_CODE.SAVE_NOT_FOUND);
				return;
			}

			const session = this._sessionService.createSession(
				this._user.id,
				save.sessionSettings,
				save
			);
			this.socketEmit(SOCKET_EVENT_SERVER.GAME_SESSION_CREATED, {
				sessionId: session.id,
			});
		} catch (e) {
			console.warn(e);
		}
	};

	private handleSendGameStatus = (
		payload: ClientPayloadMap[SOCKET_EVENT_CLIENT.SEND_GAME_STATUS]
	) => {
		const session = this.findSession(payload.sessionId);
		if (this.validateSession(session)) {
			this.socketEmit(SOCKET_EVENT_SERVER.GAME_STATUS_SENT, {
				gameStatus: session.gameStatus,
			});
		}
	};

	private handleSendSaveList = async (
		payload: ClientPayloadMap[SOCKET_EVENT_CLIENT.SEND_SAVE_LIST]
	) => {
		const saves = await SaveService.getSaveGamesOverview(this._user.id);
		if (saves) {
			this.socketEmit(SOCKET_EVENT_SERVER.SAVE_LIST_SENT, {
				list: saves,
			});
		}
	};

	private handleStartGame = (
		payload: ClientPayloadMap[SOCKET_EVENT_CLIENT.START_GAME]
	) => {
		const session = this.findSession(payload.sessionId);
		if (this.validateSession(session) && session.isHost(this._user.id)) {
			this._sessionService.startGame(this._user.id, session.id);
			this.socketRoomEmit(
				SOCKET_EVENT_SERVER.GAME_STARTED,
				payload,
				session.id
			);
		} else {
			this.emitError(ERROR_CODE.HOST_ONLY_ACTION);
		}
	};

	private handleUpdateSessionSettings = (
		payload: ClientPayloadMap[SOCKET_EVENT_CLIENT.UPDATE_SESSION_SETTINGS]
	) => {
		const session = this.findSession(payload.sessionId);
		if (this.validateSession(session) && session.isHost(this._user.id)) {
			if (session.isGameInProgress) {
				this.emitError(ERROR_CODE.LOBBY_ONLY_ACTION);
				return;
			}
			this._sessionService.updateSessionSettings(
				this._user.id,
				payload.sessionId,
				payload.settings
			);
			this.emitSessionChanged(session.id);
		} else {
			this.emitError(ERROR_CODE.HOST_ONLY_ACTION);
		}
	};

	private handleSendMessage = (
		payload: ClientPayloadMap[SOCKET_EVENT_CLIENT.SEND_MESSAGE]
	) => {
		const session = this.findSession(payload.sessionId);
		if (this.validateSession(session)) {
			this._sessionService.addMessage(
				this._user.id,
				payload.message,
				payload.sessionId
			);
		}
	};

	private handleKickPlayer = (
		payload: ClientPayloadMap[SOCKET_EVENT_CLIENT.KICK_PLAYER]
	) => {
		const session = this.findSession(payload.sessionId);
		if (this.validateSession(session) && session.isHost(this._user.id)) {
			if (session.isGameInProgress) {
				this.emitError(ERROR_CODE.LOBBY_ONLY_ACTION);
				return;
			}
			const kickedPlayer = session.players.find(
				(pl) => pl.id === payload.playerId
			);
			if (kickedPlayer) {
				session.kickPlayer(kickedPlayer.id);
				if (isUser(kickedPlayer.user)) {
					kickedPlayer.user.sockets.forEach((socket) => {
						socket.leave(session.id);
						socket.emit(SOCKET_EVENT_SERVER.PLAYER_KICKED);
					});
				}
				this.emitSessionChanged(session.id);
				this.socketEmit(SOCKET_EVENT_SERVER.SESSION_LIST_CHANGED, null);
			}
		} else {
			this.emitError(ERROR_CODE.HOST_ONLY_ACTION);
		}
	};

	private handleSetPlayerReady = (
		payload: ClientPayloadMap[SOCKET_EVENT_CLIENT.SET_PLAYER_READY]
	) => {
		const session = this.findSession(payload.sessionId);
		if (this.validateSession(session)) {
			session.setPlayerReady(this._user.id, payload.value);
			this.emitSessionChanged(session.id);
		}
	};

	private handleChangePlayerColor = (
		payload: ClientPayloadMap[SOCKET_EVENT_CLIENT.CHANGE_PLAYER_COLOR]
	) => {
		const session = this.findSession(payload.sessionId);
		if (this.validateSession(session)) {
			session.assignColor(this._user.id, payload.color);
			this.emitSessionChanged(session.id);
		}
	};

	private handleChangeCharacter = (
		payload: ClientPayloadMap[SOCKET_EVENT_CLIENT.CHANGE_CHARACTER]
	) => {
		const session = this.findSession(payload.sessionId);
		if (this.validateSession(session) && !session.isGameInProgress) {
			session.changeCharacter(this._user.id, payload.character);
			this.emitSessionChanged(session.id);
		}
	};

	private handleLeaveSession = (
		payload: ClientPayloadMap[SOCKET_EVENT_CLIENT.LEAVE_SESSION]
	) => {
		const session = this.findSession(payload.sessionId);
		if (this.validateSession(session)) {
			this._sessionService.leaveSession(this._user, payload.sessionId);
			this.emitSessionChanged(session.id);
			this.socketEmit(SOCKET_EVENT_SERVER.SESSION_LIST_CHANGED, null);
			this._socket.leave(payload.sessionId);
		}
	};

	private handleJoinSession = (
		payload: ClientPayloadMap[SOCKET_EVENT_CLIENT.JOIN_SESSION]
	) => {
		const session = this.findSession(payload.sessionId);
		if (session) {
			if (!session.isUserInSession(this._user.id)) {
				try {
					this._sessionService.joinSession(
						this._user,
						payload.sessionId,
						payload.password
					);
					this._socket.join(session.id);
					this.emitSessionChanged(session.id);
					this.socketEmit(SOCKET_EVENT_SERVER.JOIN_SESSION_RESPONSE, {
						sessionId: payload.sessionId,
					});
					this.socketEmit(
						SOCKET_EVENT_SERVER.SESSION_LIST_CHANGED,
						null
					);
				} catch (error) {
					if (error instanceof SessionConnectError) {
						this.emitConnectionError(error.code);
					} else {
						throw error;
					}
				}
			} else {
				this.socketEmit(SOCKET_EVENT_SERVER.JOIN_SESSION_RESPONSE, {
					sessionId: payload.sessionId,
				});
			}
		} else {
			this.emitConnectionError(
				SESSION_CONNECTION_ERROR_CODE.SESSION_NOT_FOUND
			);
		}
	};

	private handlePlayerAction = (
		actionData: ClientPayloadMap[SOCKET_EVENT_CLIENT.EXECUTE_PLAYER_ACTION]
	) => {
		const session = this.findSession(actionData.sessionId);
		if (this.validateSession(session)) {
			session.handleAction(
				this._user.id,
				actionData.actionType,
				...actionData.arguments
			);
			this.emitSessionChanged(session.id);
		}
	};

	private handleSendSessionData = (
		payload: ClientPayloadMap[SOCKET_EVENT_CLIENT.SEND_SESSION_DATA]
	) => {
		const session = this.findSession(payload.sessionId);
		if (this.validateSession(session)) {
			if (!this._socket.rooms.has(session.id)) {
				this._socket.join(session.id);
			}
			this.socketEmit(SOCKET_EVENT_SERVER.SESSION_DATA_SENT, {
				sessionData: session.getRenderData(this._user.id),
			});
		}
	};

	private handleSendSessionList = () => {
		const sessionList = this._sessionService.getPublicSessionList();

		this.socketEmit(SOCKET_EVENT_SERVER.SESSION_LIST_SENT, {sessionList})
	}

	private handlCreateQuickGame = () => {
		this._sessionService.createQuickGameSession(this._user.id);
		this.socketEmit(SOCKET_EVENT_SERVER.GAME_SESSION_CREATED, {
			sessionId: "quickgame",
		});
	};

	private handleCreateSession = (
		payload: ClientPayloadMap[SOCKET_EVENT_CLIENT.CREATE_SESSION]
	) => {
		try {
			const settings = { ...payload.settings, quickGame: false };
			const session = this._sessionService.createSession(
				this._user.id,
				settings
			);
			this._socket.join(session.id);
			if (!session.settings.private) {
				this.socketEmit(SOCKET_EVENT_SERVER.SESSION_LIST_CHANGED, null);
			}
			this.socketEmit(SOCKET_EVENT_SERVER.GAME_SESSION_CREATED, {
				sessionId: session.id,
			});
		} catch (e) {
			console.error("Failed to create session:", e);
		}
	};

	private socketEmit<E extends keyof ServerPayloadMap>(
		event: E,
		payload: ServerPayloadMap[E]
	) {
		this._socket.emit(event, payload);
	}

	private socketRoomEmit<E extends keyof ServerPayloadMap>(
		event: E,
		payload: ServerPayloadMap[E],
		sessionId: string
	) {
		this._io.to(sessionId).emit(event, payload);
	}

	private findSession(sessionId: string) {
		return this._sessionService.findSession(this._user.id, sessionId);
	}


	private emitError(code: ERROR_CODE, message: string = "") {
		console.warn(code);
		this.socketEmit(SOCKET_EVENT_SERVER.ERROR_SENT, {
			code,
			message,
		});
	}

	private emitConnectionError(code: SESSION_CONNECTION_ERROR_CODE) {
		console.warn(code);
		this.socketEmit(SOCKET_EVENT_SERVER.SESSION_CONNECTION_STATUS_SENT, {
			error: code,
		});
	}

	private validateSession(
		session: null | SessionData
	): session is SessionData {
		if (!session) {
			this.emitConnectionError(
				SESSION_CONNECTION_ERROR_CODE.SESSION_NOT_FOUND
			);
			console.warn("session not found")
			return false;
		}
		if (!session.isUserInSession(this._user.id)) {
			this.emitConnectionError(
				SESSION_CONNECTION_ERROR_CODE.ACCESS_DENIED
			);
			console.warn("user not in session")
			return false;
		}
		return true;
	}

	private validateData<T extends SOCKET_EVENT_CLIENT>(
		event: T,
		payload: ClientPayloadMap[T]
	) {
		const schema = ClientPayloadSchemas[event];
		return schema.validate(payload);
	}

	private emitSessionChanged(sessionId: string) {
		this.socketRoomEmit(
			SOCKET_EVENT_SERVER.SESSION_CHANGED,
			{ sessionId },
			sessionId
		);
	}

	private initEventMap() {
		return new Map(
			Object.entries({
				[SOCKET_EVENT_CLIENT.CREATE_QUICK_GAME]: this.handlCreateQuickGame,
				[SOCKET_EVENT_CLIENT.CREATE_SESSION]: this.handleCreateSession,
				[SOCKET_EVENT_CLIENT.SEND_SESSION_DATA]:
					this.handleSendSessionData,
				[SOCKET_EVENT_CLIENT.EXECUTE_PLAYER_ACTION]:
					this.handlePlayerAction,
				[SOCKET_EVENT_CLIENT.JOIN_SESSION]: this.handleJoinSession,
				[SOCKET_EVENT_CLIENT.LEAVE_SESSION]: this.handleLeaveSession,
				[SOCKET_EVENT_CLIENT.CHANGE_CHARACTER]:
					this.handleChangeCharacter,
				[SOCKET_EVENT_CLIENT.CHANGE_PLAYER_COLOR]:
					this.handleChangePlayerColor,
				[SOCKET_EVENT_CLIENT.SET_PLAYER_READY]:
					this.handleSetPlayerReady,
				[SOCKET_EVENT_CLIENT.KICK_PLAYER]: this.handleKickPlayer,
				[SOCKET_EVENT_CLIENT.SEND_MESSAGE]: this.handleSendMessage,
				[SOCKET_EVENT_CLIENT.UPDATE_SESSION_SETTINGS]:
					this.handleUpdateSessionSettings,
				[SOCKET_EVENT_CLIENT.START_GAME]: this.handleStartGame,
				[SOCKET_EVENT_CLIENT.SEND_SAVE_LIST]: this.handleSendSaveList,
				[SOCKET_EVENT_CLIENT.SEND_GAME_STATUS]:
					this.handleSendGameStatus,
				[SOCKET_EVENT_CLIENT.LOAD_SAVE]: this.handleLoadGame,
				[SOCKET_EVENT_CLIENT.DELETE_SAVE]: this.handleDeleteSave,
				[SOCKET_EVENT_CLIENT.SAVE_GAME]: this.handleSaveGame,
				[SOCKET_EVENT_CLIENT.PONG]: this.handlePong,
				[SOCKET_EVENT_CLIENT.SEND_SESSION_LIST]: this.handleSendSessionList,
				"disconnect": this.handleDisconnect,
			})
		);
	}
}
