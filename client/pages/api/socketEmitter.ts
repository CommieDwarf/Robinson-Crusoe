import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {ActionArgMap} from "@shared/types/ActionArgMap";
import {Socket} from "socket.io-client";
import {CreateSessionPayload, SOCKET_EMITTER, SocketPayloadMap} from "@shared/types/Requests/Socket";
import {SessionSettings} from "@shared/types/SessionSettings";
import {AssignedCharacter} from "@shared/types/Game/PlayerService/Player";

export class SocketEmitter {
    private _userId: string = "";
    private _currentSessionId: string = "";
    private _socket: Socket;

    constructor(socket: Socket) {
        this._socket = socket;
    }

    public setUser(userId: string) {
        if (!userId) {
            throw new Error(`userId is ${userId}`)
        }
        this._userId = userId;
    }

    public setCurrentSessionId(sessionId: string) {
        this._currentSessionId = sessionId;
    }

    public emitAction<T extends CONTROLLER_ACTION>(action: T, ...args: ActionArgMap[T]) {
        const payload: SocketPayloadMap[SOCKET_EMITTER.PLAYER_ACTION] = {
            actionType: action,
            arguments: args,
            sessionId: this._currentSessionId,
        }
        this.emitSocket(SOCKET_EMITTER.PLAYER_ACTION, payload);
    }

    public connectSocketWithAuthToken(authToken: string) {
        if (!authToken) {
            throw new Error("authToken is missing")
        }
        console.log("connecting!", authToken);
        this._socket.io.opts.extraHeaders = {
            Authorization: authToken,
        };
        this._socket.connect();

        this._socket.on("connect", () => {
            console.log("socket connected!")
        })
    }

    public emitCreateQuickGame() {
        this.emitSocket(SOCKET_EMITTER.CREATE_QUICK_GAME, {})
    }

    public emitRequestGameSession() {
        this.emitSocket(SOCKET_EMITTER.SESSION_DATA_REQUESTED, {sessionId: this._currentSessionId})
    }

    public emitRequestSessionList() {
        this.emitSocket(SOCKET_EMITTER.SESSION_LIST_REQUESTED, {});
    }

    // public async emitExecuteGameMethodAndSendResponse<T extends keyof IGame>(methodName: keyof IGame, methodArgs: any[]): Promise<ReturnType<any>> {
    //     return new Promise((resolve, reject) => {
    //         const requestId = uuid();
    //         const onResponse = (payload: SocketPayloadMap[SOCKET_EMITTER.GAME_METHOD_RESPONDED]) => {
    //             if (payload.requestId === requestId) {
    //                 resolve(payload);
    //                 console.log("resolved!");
    //                 this._socket.off(SOCKET_EMITTER.GAME_METHOD_RESPONDED, onResponse);
    //             }
    //         }
    //         this._socket.on(SOCKET_EMITTER.GAME_METHOD_RESPONDED, onResponse);
    //         const payload = {methodName, methodArgs, userId: this._userId, requestId, sessionId: this._currentSessionId}
    //         this.emitSocket(SOCKET_EMITTER.EXECUTE_GAME_METHOD_AND_SEND_RESPONSE, payload)
    //         //TODO: dodaj obsługe błędów
    //     })
    // }

    public emitIsGameInProgress() {
        this.emitSocket(SOCKET_EMITTER.IS_QUICK_GAME_IN_PROGRESS, {})
    }

    public emitCreateSession(settings: SessionSettings) {
        const payload: CreateSessionPayload = {
            settings,
        }
        this.emitSocket(SOCKET_EMITTER.CREATE_SESSION, payload);
    }

    public emitJoinSession(sessionId: string, password: string) {
        this.emitSocket(SOCKET_EMITTER.JOIN_SESSION, {password, sessionId: sessionId});
    }

    public emitLeaveSession(sessionId: string) {
        this.emitSocket(SOCKET_EMITTER.LEAVE_SESSION, {sessionId})
    }

    public emitChangeCharacter(character: Partial<AssignedCharacter>) {
        this.emitSocket(SOCKET_EMITTER.CHANGE_CHARACTER, {sessionId: this._currentSessionId, character})
    }

    public emitSetPlayerReady(value: boolean) {
        this.emitSocket(SOCKET_EMITTER.SET_PLAYER_READY, {sessionId: this._currentSessionId, value})
    }

    public emitKickPlayer(playerId: string) {
        this.emitSocket(SOCKET_EMITTER.KICK_PLAYER, {sessionId: this._currentSessionId, playerId})
    }

    public emitPong(payload: SocketPayloadMap[SOCKET_EMITTER.PING]) {
        this.emitSocket(SOCKET_EMITTER.PONG, payload)
    }

    public emitDisconnect() {
        this.emitSocket(SOCKET_EMITTER.DISCONNECT, {});
    }

    public emitSendMessage(message: string) {
        this.emitSocket(SOCKET_EMITTER.SEND_MESSAGE, {
            message,
            sessionId: this._currentSessionId
        })
    }

    private emitSocket<T extends keyof SocketPayloadMap>(socketEmitter: T, payload: SocketPayloadMap[T]) {
        this._socket.emit(socketEmitter, payload);
    }
}


