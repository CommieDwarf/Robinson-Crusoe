import {IGame, IGameRenderData} from "@shared/types/Game/Game";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {SessionSettings} from "@shared/types/SessionSettings";
import {SessionBasicInfo, SessionRenderData} from "../Session/Session";
import {SESSION_JOIN_ERROR_CODE} from "@shared/types/Errors/SESSION_JOIN_ERROR_CODE";
import {AssignedCharacter} from "@shared/types/Game/PlayerService/Player";

export enum SOCKET_EMITTER {
    EXECUTE_GAME_METHOD_AND_SEND_RESPONSE = "execute game method nad send response",
    GAME_METHOD_RESPONDED = "game method responded",
    PLAYER_ACTION = "player action",
    IS_QUICK_GAME_IN_PROGRESS = "is quick game in progress",
    IS_QUICK_GAME_IN_PROGRESS_RESPONSE = "is quick game in progress response",
    CREATE_SESSION = "create session",
    CREATE_QUICK_GAME = "create quick game",
    GAME_SESSION_CREATED = "game session created",
    SESSION_DATA_REQUESTED = "session data requested",
    SESSION_DATA_SENT = "session data sent",
    DISCONNECT = "disconnect",
    SESSION_LIST_REQUESTED = "session list requested",
    SESSION_LIST_SENT = "session list sent",
    SESSION_LIST_CHANGED = "session list changed",
    JOIN_SESSION = "join session",
    JOIN_SESSION_RESPONSE = "join session response",
    LEAVE_SESSION = "leave session",
    SESSION_CHANGED = "session changed",
    CHANGE_CHARACTER = "change character",
    SET_PLAYER_READY = "set player ready",
    KICK_PLAYER = "kick player",
    PLAYER_KICKED = "player kicked",
    PING = "ping",
    PONG = "pong",
    PLAYER_LATENCY_SENT = "players ping sent"
}


interface SessionId {
    sessionId: string;
}

export interface ExecuteGameMethodAndSendResponsePayload extends SessionId {
    userId: string,
    methodName: keyof IGame,
    methodArgs: any[],
    requestId: string,
}

export interface PlayerActionPayload extends SessionId {
    actionType: CONTROLLER_ACTION,
    arguments: any[],
}


export interface CreateSessionPayload {
    settings: SessionSettings;
}

export interface SessionDataRequestedPayload extends SessionId {
    sessionId: string;
}

export interface SessionDataSentPayload {
    sessionData: SessionRenderData
}

export interface GameMethodRespondedPayload {
    result: any;
    requestId: string;
}

export interface GameSessionCreatedPayload {
    sessionId: string;
}

export interface SessionListSentPayload {
    sessionList: SessionBasicInfo[];
}

export interface JoinSessionPayload {
    sessionId: string,
    password: string,
}

export interface JoinSessionResponsePayload {
    sessionId: string;
    error?: SESSION_JOIN_ERROR_CODE;
}

interface LeaveSessionPayload {
    sessionId: string
}

interface ChangeCharacterPayload {
    sessionId: string;
    character: Partial<AssignedCharacter>;
}

interface SetPlayerReadyPayload {
    sessionId: string;
    value: boolean;
}

interface KickPlayerPayload {
    sessionId: string;
    playerId: string;
}

interface PingPayload {
    timestamp: number;
    sessionId: string;
}

interface PongPayload {
    timestamp: number;
}

interface PlayerLatencySentPayload {
    playerId: string;
    latency: number | null;
}


export type SocketPayloadMap = {
    [SOCKET_EMITTER.EXECUTE_GAME_METHOD_AND_SEND_RESPONSE]: ExecuteGameMethodAndSendResponsePayload;
    [SOCKET_EMITTER.PLAYER_ACTION]: PlayerActionPayload;
    [SOCKET_EMITTER.IS_QUICK_GAME_IN_PROGRESS]: {};
    [SOCKET_EMITTER.CREATE_SESSION]: CreateSessionPayload;
    [SOCKET_EMITTER.SESSION_DATA_REQUESTED]: SessionDataRequestedPayload;
    [SOCKET_EMITTER.SESSION_DATA_SENT]: SessionDataSentPayload;
    [SOCKET_EMITTER.GAME_METHOD_RESPONDED]: GameMethodRespondedPayload;
    [SOCKET_EMITTER.IS_QUICK_GAME_IN_PROGRESS_RESPONSE]: { value: boolean };
    [SOCKET_EMITTER.CREATE_QUICK_GAME]: {};
    [SOCKET_EMITTER.GAME_SESSION_CREATED]: GameSessionCreatedPayload;
    [SOCKET_EMITTER.SESSION_LIST_REQUESTED]: {};
    [SOCKET_EMITTER.SESSION_LIST_SENT]: SessionListSentPayload;
    [SOCKET_EMITTER.JOIN_SESSION]: JoinSessionPayload;
    [SOCKET_EMITTER.JOIN_SESSION_RESPONSE]: JoinSessionResponsePayload;
    [SOCKET_EMITTER.LEAVE_SESSION]: LeaveSessionPayload;
    [SOCKET_EMITTER.CHANGE_CHARACTER]: ChangeCharacterPayload;
    [SOCKET_EMITTER.SET_PLAYER_READY]: SetPlayerReadyPayload;
    [SOCKET_EMITTER.KICK_PLAYER]: KickPlayerPayload;
    [SOCKET_EMITTER.SESSION_CHANGED]: {};
    [SOCKET_EMITTER.PLAYER_KICKED]: {};
    [SOCKET_EMITTER.SESSION_LIST_CHANGED]: {};
    [SOCKET_EMITTER.PING]: PingPayload;
    [SOCKET_EMITTER.PONG]: PongPayload;
    [SOCKET_EMITTER.DISCONNECT]: any;
    [SOCKET_EMITTER.PLAYER_LATENCY_SENT]: PlayerLatencySentPayload;
};
