import {GAME_STATUS, IGame, IGameRenderData} from "@shared/types/Game/Game";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {SessionSettings} from "@shared/types/SessionSettings";
import {SessionBasicInfo, SessionRenderData} from "../Session/Session";
import {SESSION_CONNECTION_ERROR_CODE} from "@shared/types/Errors/SESSION_CONNECTION_ERROR_CODE";
import {AssignedCharacter} from "@shared/types/Game/PlayerService/Player";
import {ALERT_CODE} from "@shared/types/ALERT_CODE";
import {PLAYER_COLOR} from "@shared/types/Game/PLAYER_COLOR";

export enum SOCKET_EVENT {
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
    USER_LATENCY_SENT = "players ping sent",
    SEND_MESSAGE = "send message",
    UPDATE_SESSION_SETTINGS = "update session settings",
    START_GAME = "start game",
    GAME_STARTED = "game started",
    USER_LEFT_LOBBY = "user left lobby",
    GAMES_IN_PROGRESS_LIST_REQUESTED = "games in progress list requested",
    GAME_STATUS_REQUESTED = "game status requested",
    GAME_STATUS_SENT = "game status sent",
    SESSION_CONNECTION_FAILED = "session connection failed",
    CONNECTED = "connected",
    GAMES_IN_PROGRESS_SENT = "games in progress sent",
    ALERT_SENT = "alert sent",
    CHANGE_PLAYER_COLOR = "change color",
    PLAYER_LATENCY_LIST_SENT = "player latency list sent",
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
    settings: Omit<SessionSettings, "quickGame">;
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
    error?: SESSION_CONNECTION_ERROR_CODE;
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
}

interface PongPayload {
    timestamp: number;
}

interface UserLatencySentPayload {
    latency: number | null;
}

interface SendMessagePayload {
    sessionId: string;
    message: string;
}

interface UpdateSessionSettingsPayload {
    sessionId: string;
    settings: Partial<SessionSettings>;
}

interface StartGamePayload {
    sessionId: string;
}

interface GameStartedPayload {
    sessionId: string
}

interface UserLeftLobbyPayload {
    sessionId: string
}

interface GameStatusRequestedPayload {
    sessionId: string;
}

interface GameStatusSentPayload {
    gameStatus: GAME_STATUS | null,
    error?: SESSION_CONNECTION_ERROR_CODE
}

interface SessionConnectionFailedPayload {
    error: SESSION_CONNECTION_ERROR_CODE
}

interface AlertSentPayload {
    code: ALERT_CODE
}

interface ChangeColorPayload {
    color: PLAYER_COLOR,
    sessionId: string,
}

interface PlayerLatencyListSentPayload {
    list: {
        playerId: string,
        latency: string
    }[]
}


export type SocketPayloadMap = {
    [SOCKET_EVENT.EXECUTE_GAME_METHOD_AND_SEND_RESPONSE]: ExecuteGameMethodAndSendResponsePayload;
    [SOCKET_EVENT.PLAYER_ACTION]: PlayerActionPayload;
    [SOCKET_EVENT.IS_QUICK_GAME_IN_PROGRESS]: any;
    [SOCKET_EVENT.CREATE_SESSION]: CreateSessionPayload;
    [SOCKET_EVENT.SESSION_DATA_REQUESTED]: SessionDataRequestedPayload;
    [SOCKET_EVENT.SESSION_DATA_SENT]: SessionDataSentPayload;
    [SOCKET_EVENT.GAME_METHOD_RESPONDED]: GameMethodRespondedPayload;
    [SOCKET_EVENT.IS_QUICK_GAME_IN_PROGRESS_RESPONSE]: { value: boolean };
    [SOCKET_EVENT.CREATE_QUICK_GAME]: any;
    [SOCKET_EVENT.GAME_SESSION_CREATED]: GameSessionCreatedPayload;
    [SOCKET_EVENT.SESSION_LIST_REQUESTED]: any;
    [SOCKET_EVENT.SESSION_LIST_SENT]: SessionListSentPayload;
    [SOCKET_EVENT.GAMES_IN_PROGRESS_SENT]: SessionListSentPayload;
    [SOCKET_EVENT.JOIN_SESSION]: JoinSessionPayload;
    [SOCKET_EVENT.JOIN_SESSION_RESPONSE]: JoinSessionResponsePayload;
    [SOCKET_EVENT.LEAVE_SESSION]: LeaveSessionPayload;
    [SOCKET_EVENT.CHANGE_CHARACTER]: ChangeCharacterPayload;
    [SOCKET_EVENT.SET_PLAYER_READY]: SetPlayerReadyPayload;
    [SOCKET_EVENT.KICK_PLAYER]: KickPlayerPayload;
    [SOCKET_EVENT.SESSION_CHANGED]: any;
    [SOCKET_EVENT.PLAYER_KICKED]: any;
    [SOCKET_EVENT.SESSION_LIST_CHANGED]: any;
    [SOCKET_EVENT.PING]: PingPayload;
    [SOCKET_EVENT.PONG]: PongPayload;
    [SOCKET_EVENT.DISCONNECT]: any;
    [SOCKET_EVENT.USER_LATENCY_SENT]: UserLatencySentPayload;
    [SOCKET_EVENT.SEND_MESSAGE]: SendMessagePayload,
    [SOCKET_EVENT.UPDATE_SESSION_SETTINGS]: UpdateSessionSettingsPayload,
    [SOCKET_EVENT.START_GAME]: StartGamePayload,
    [SOCKET_EVENT.GAME_STARTED]: GameStartedPayload,
    [SOCKET_EVENT.USER_LEFT_LOBBY]: UserLeftLobbyPayload,
    [SOCKET_EVENT.GAMES_IN_PROGRESS_LIST_REQUESTED]: any,
    [SOCKET_EVENT.GAME_STATUS_REQUESTED]: GameStatusRequestedPayload;
    [SOCKET_EVENT.GAME_STATUS_SENT]: GameStatusSentPayload;
    [SOCKET_EVENT.SESSION_CONNECTION_FAILED]: SessionConnectionFailedPayload;
    [SOCKET_EVENT.CONNECTED]: any;
    [SOCKET_EVENT.ALERT_SENT]: AlertSentPayload;
    [SOCKET_EVENT.CHANGE_PLAYER_COLOR]: ChangeColorPayload;
    [SOCKET_EVENT.PLAYER_LATENCY_LIST_SENT]: PlayerLatencyListSentPayload;
};
