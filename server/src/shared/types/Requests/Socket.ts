import {IGame, IGameRenderData} from "@shared/types/Game/Game";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {SessionSettings} from "@shared/types/SessionSettings";
import {SessionBasicInfo, SessionRenderData} from "../Session/Session";

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
    JOIN_SESSION = "join session",
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
    id: string,
    password: string,
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
};
