import { CONTROLLER_ACTION } from './../CONTROLLER_ACTION';
import {GAME_STATUS} from "@shared/types/Game/Game";
import {SessionSettings} from "@shared/types/SessionSettings";
import {SessionBasicInfo, SessionRenderData} from "../Session/Session";
import {SESSION_CONNECTION_ERROR_CODE} from "@shared/types/Errors/SESSION_CONNECTION_ERROR_CODE";
import {AssignedCharacter} from "@shared/types/Game/PlayerService/Player";
import {ALERT_CODE} from "@shared/types/ALERT_CODE";
import {PLAYER_COLOR} from "@shared/types/Game/PLAYER_COLOR";
import { ERROR_CODE } from '../Errors/ERROR';
import { SaveOverview } from '../SaveGame';
import { EndGameSummary } from '../Game/GameSummary/GameSummary';

export enum SOCKET_EVENT_CLIENT {
    EXECUTE_PLAYER_ACTION = "execute player action",
    SEND_QUICK_GAME_STATUS = "send quick game status",
    CREATE_SESSION = "create session",
    CREATE_QUICK_GAME = "create quick game",
    SEND_SESSION_DATA = "send session data",
    DISCONNECT = "disconnect",
    SEND_SESSION_LIST = "send session list",
    JOIN_SESSION = "join session",
    JOIN_SESSION_BY_CODE = "join session by code",
    LEAVE_SESSION = "leave session",
    CHANGE_CHARACTER = "change character",
    SET_PLAYER_READY = "set player ready",
    KICK_PLAYER = "kick player",
    PONG = "pong",
    SEND_MESSAGE = "send message",
    UPDATE_SESSION_SETTINGS = "update session settings",
    START_GAME = "start game",
    SEND_GAME_IN_PROGRESS_LIST = "send game in progress list",
    SEND_GAME_STATUS = "send game status",
    CHANGE_PLAYER_COLOR = "change color",
    SEND_SAVE_LIST = "send save list",
    SAVE_GAME = "save game",
    LOAD_SAVE = "load save",
    DELETE_SAVE = "delete save",
    RESTART_GAME = "restart game",
    TERMINATE_GAME = "terminate game",
}

export enum SOCKET_EVENT_SERVER {
    CONNECTED = "connected",
    DISCONNECTED = "disconnected",
    GAME_SESSION_CREATED = "game session created",
    SESSION_DATA_SENT = "session data sent",
    SESSION_LIST_SENT = "session list sent",
    SESSION_LIST_CHANGED = "session list changed",
    JOIN_SESSION_RESPONSE = "join session response",
    SESSION_CHANGED = "session changed",
    PLAYER_KICKED = "player kicked",
    PING = "ping",
    USER_LATENCY_SENT = "user latency sent",
    GAME_STARTED = "game started",
    USER_LEFT_LOBBY = "user left lobby",
    GAME_STATUS_SENT = "game status sent",
    SESSION_CONNECTION_STATUS_SENT = "session connection sent",
    GAME_IN_PROGRESS_LIST_SENT = "game in progress list sent",
    GAME_IN_PROGRESS_LIST_CHANGED = "game in progress lsit changed",
    ALERT_SENT = "alert sent",
    PLAYER_LATENCY_LIST_SENT = "player latency list sent",
    ERROR_SENT = "error",
    SAVE_LIST_SENT = "save list sent",
    GAME_SAVED_STATUS = "game saved status",
    GAME_RESTARTED = "game restarted",
}


export type ClientPayloadMap = {
    [SOCKET_EVENT_CLIENT.EXECUTE_PLAYER_ACTION]: {
        actionType: CONTROLLER_ACTION,
        arguments: any[],
        sessionId: string,
    },
    [SOCKET_EVENT_CLIENT.SEND_QUICK_GAME_STATUS]: any,
    [SOCKET_EVENT_CLIENT.CREATE_SESSION]: {
        settings: Omit<SessionSettings, "quickGame">
    },
    [SOCKET_EVENT_CLIENT.CREATE_QUICK_GAME]: any,
    [SOCKET_EVENT_CLIENT.SEND_SESSION_DATA]: {
        sessionId: string,
    },
    [SOCKET_EVENT_CLIENT.DISCONNECT]: any,
    [SOCKET_EVENT_CLIENT.SEND_SESSION_LIST]: any,
    [SOCKET_EVENT_CLIENT.JOIN_SESSION]: {
        sessionId: string,
        password: string,
    },
    [SOCKET_EVENT_CLIENT.LEAVE_SESSION]: {
        sessionId: string,
    },
    [SOCKET_EVENT_CLIENT.CHANGE_CHARACTER]: {
        sessionId: string,
        character: Partial<AssignedCharacter>,
    },
    [SOCKET_EVENT_CLIENT.SET_PLAYER_READY]: {
        sessionId: string,
        value: boolean,
    },
    [SOCKET_EVENT_CLIENT.KICK_PLAYER]: {
        sessionId: string,
        playerId: string,
    },
    [SOCKET_EVENT_CLIENT.PONG]: {
        timestamp: number,
    },
    [SOCKET_EVENT_CLIENT.SEND_MESSAGE]: {
        sessionId: string,
        message: string,
    },
    [SOCKET_EVENT_CLIENT.UPDATE_SESSION_SETTINGS]: {
        sessionId: string,
        settings: Partial<SessionSettings>,
    },
    [SOCKET_EVENT_CLIENT.START_GAME]: {
        sessionId: string,
    },
    [SOCKET_EVENT_CLIENT.SEND_GAME_IN_PROGRESS_LIST]: any,
    [SOCKET_EVENT_CLIENT.SEND_GAME_STATUS]: {
        sessionId: string,
    },
    [SOCKET_EVENT_CLIENT.CHANGE_PLAYER_COLOR]: {
        color: PLAYER_COLOR,
        sessionId: string,
    },
    [SOCKET_EVENT_CLIENT.SEND_SAVE_LIST]: any,
    [SOCKET_EVENT_CLIENT.SAVE_GAME]: {
        sessionId: string,
    },
    [SOCKET_EVENT_CLIENT.LOAD_SAVE]: {
        saveId: string,
    },
    [SOCKET_EVENT_CLIENT.DELETE_SAVE]: {
        saveId: string,
    },
    [SOCKET_EVENT_CLIENT.JOIN_SESSION_BY_CODE]: {
        code: string,
        password: string,
    },
    [SOCKET_EVENT_CLIENT.RESTART_GAME]: {
        sessionId: string,
    },
    [SOCKET_EVENT_CLIENT.TERMINATE_GAME]: {
        sessionId: string,
    }
}

export type ServerPayloadMap = {
    [SOCKET_EVENT_SERVER.GAME_SESSION_CREATED]: {
        sessionId: string,
    },
    [SOCKET_EVENT_SERVER.SESSION_DATA_SENT]: {
        sessionData: SessionRenderData,
    },
    [SOCKET_EVENT_SERVER.SESSION_LIST_SENT]: {
        sessionList: SessionBasicInfo[],
    },
    [SOCKET_EVENT_SERVER.SESSION_LIST_CHANGED]: any,
    [SOCKET_EVENT_SERVER.JOIN_SESSION_RESPONSE]: {
        sessionId: string,
        error?: SESSION_CONNECTION_ERROR_CODE,
    },
    [SOCKET_EVENT_SERVER.SESSION_CHANGED]: {
        sessionId: string,
    },
    [SOCKET_EVENT_SERVER.PLAYER_KICKED]: {
        playerId: string,
    },
    [SOCKET_EVENT_SERVER.PING]: {
        timestamp: number,
    },
    [SOCKET_EVENT_SERVER.USER_LATENCY_SENT]: {
        latency: number | null,
    },
    [SOCKET_EVENT_SERVER.GAME_STARTED]: {
        sessionId: string,
    },
    [SOCKET_EVENT_SERVER.USER_LEFT_LOBBY]: {
        sessionId: string,
    },
    [SOCKET_EVENT_SERVER.GAME_STATUS_SENT]: {
        gameStatus: GAME_STATUS | null,
        error?: SESSION_CONNECTION_ERROR_CODE,
    },
    [SOCKET_EVENT_SERVER.SESSION_CONNECTION_STATUS_SENT]: {
        error?: SESSION_CONNECTION_ERROR_CODE,
    },
    [SOCKET_EVENT_SERVER.GAME_IN_PROGRESS_LIST_SENT]: {
        sessionList: SessionBasicInfo[],
    },
    [SOCKET_EVENT_SERVER.ALERT_SENT]: {
        code: ALERT_CODE,
    },
    [SOCKET_EVENT_SERVER.PLAYER_LATENCY_LIST_SENT]: {
        list: {
            playerId: string,
            latency: string,
        }[],
    },
    [SOCKET_EVENT_SERVER.ERROR_SENT]: {
        code: ERROR_CODE,
        message: string,
    },
    [SOCKET_EVENT_SERVER.SAVE_LIST_SENT]: {
        list: SaveOverview[]
    },
    [SOCKET_EVENT_SERVER.CONNECTED]: any,
    [SOCKET_EVENT_SERVER.DISCONNECTED]: any,
    [SOCKET_EVENT_SERVER.GAME_SAVED_STATUS]: {
        success: boolean
    },
    [SOCKET_EVENT_SERVER.GAME_IN_PROGRESS_LIST_CHANGED]: any,
    [SOCKET_EVENT_SERVER.GAME_RESTARTED]: any,
}





