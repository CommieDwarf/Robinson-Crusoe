"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPayloadSchemas = void 0;
const VALIDATION_CONFIG_1 = require("@shared/config/VALIDATION_CONFIG");
const CONTROLLER_ACTION_1 = require("@shared/types/CONTROLLER_ACTION");
const PLAYER_COLOR_1 = require("@shared/types/Game/PLAYER_COLOR");
const SCENARIO_1 = require("@shared/types/Game/ScenarioService/SCENARIO");
const Socket_1 = require("@shared/types/Requests/Socket");
const joi_1 = __importDefault(require("joi"));
const password = joi_1.default.string().allow("").max(VALIDATION_CONFIG_1.VALIDATION_CONFIG.MAX_PASSWORD_LENGTH);
const settings = {};
exports.ClientPayloadSchemas = {
    [Socket_1.SOCKET_EVENT_CLIENT.EXECUTE_PLAYER_ACTION]: joi_1.default.object({
        actionType: joi_1.default.string()
            .valid(...Object.values(CONTROLLER_ACTION_1.CONTROLLER_ACTION_OBJECT))
            .required(),
        arguments: joi_1.default.array().items(joi_1.default.any()).required(),
        sessionId: joi_1.default.string().required(),
    }),
    [Socket_1.SOCKET_EVENT_CLIENT.SEND_QUICK_GAME_STATUS]: joi_1.default.any(),
    [Socket_1.SOCKET_EVENT_CLIENT.CREATE_SESSION]: joi_1.default.object({
        settings: joi_1.default.object({
            scenario: joi_1.default.string()
                .valid(...Object.values(SCENARIO_1.SCENARIO))
                .required(),
            name: joi_1.default.string()
                .required()
                .max(VALIDATION_CONFIG_1.VALIDATION_CONFIG.MAX_NAME_LENGTH),
            quickGame: joi_1.default.boolean().required(),
            private: joi_1.default.boolean().required(),
            password,
            maxPlayers: joi_1.default.number()
                .required()
                .max(VALIDATION_CONFIG_1.VALIDATION_CONFIG.MAX_PLAYERS)
                .min(VALIDATION_CONFIG_1.VALIDATION_CONFIG.MIN_PLAYERS),
        }).required(),
    }),
    [Socket_1.SOCKET_EVENT_CLIENT.CREATE_QUICK_GAME]: joi_1.default.any(),
    [Socket_1.SOCKET_EVENT_CLIENT.SEND_SESSION_DATA]: joi_1.default.object({
        sessionId: joi_1.default.string().required(),
    }),
    [Socket_1.SOCKET_EVENT_CLIENT.DISCONNECT]: joi_1.default.any(),
    [Socket_1.SOCKET_EVENT_CLIENT.SEND_SESSION_LIST]: joi_1.default.any(),
    [Socket_1.SOCKET_EVENT_CLIENT.JOIN_SESSION]: joi_1.default.object({
        sessionId: joi_1.default.string().required(),
        password,
    }),
    [Socket_1.SOCKET_EVENT_CLIENT.JOIN_SESSION_BY_CODE]: joi_1.default.object({
        code: joi_1.default.string().required(),
        password,
    }),
    [Socket_1.SOCKET_EVENT_CLIENT.LEAVE_SESSION]: joi_1.default.object({
        sessionId: joi_1.default.string().required(),
    }),
    [Socket_1.SOCKET_EVENT_CLIENT.CHANGE_CHARACTER]: joi_1.default.object({
        sessionId: joi_1.default.string().required(),
        character: joi_1.default.object().unknown(true), // Partial<AssignedCharacter>
    }),
    [Socket_1.SOCKET_EVENT_CLIENT.SET_PLAYER_READY]: joi_1.default.object({
        sessionId: joi_1.default.string().required(),
        value: joi_1.default.boolean().required(),
    }),
    [Socket_1.SOCKET_EVENT_CLIENT.KICK_PLAYER]: joi_1.default.object({
        sessionId: joi_1.default.string().required(),
        playerId: joi_1.default.string().required(),
    }),
    [Socket_1.SOCKET_EVENT_CLIENT.PONG]: joi_1.default.object({
        timestamp: joi_1.default.number().required(),
    }),
    [Socket_1.SOCKET_EVENT_CLIENT.SEND_MESSAGE]: joi_1.default.object({
        sessionId: joi_1.default.string().required(),
        message: joi_1.default.string().required(),
    }),
    [Socket_1.SOCKET_EVENT_CLIENT.UPDATE_SESSION_SETTINGS]: joi_1.default.object({
        sessionId: joi_1.default.string().required(),
        settings: joi_1.default.object({
            scenario: joi_1.default.string()
                .valid(...Object.values(SCENARIO_1.SCENARIO)),
            name: joi_1.default.string()
                .max(VALIDATION_CONFIG_1.VALIDATION_CONFIG.MAX_NAME_LENGTH),
            quickGame: joi_1.default.boolean(),
            private: joi_1.default.boolean(),
            password,
            maxPlayers: joi_1.default.number()
                .max(VALIDATION_CONFIG_1.VALIDATION_CONFIG.MAX_PLAYERS)
                .min(VALIDATION_CONFIG_1.VALIDATION_CONFIG.MIN_PLAYERS),
        }).required(),
    }),
    [Socket_1.SOCKET_EVENT_CLIENT.START_GAME]: joi_1.default.object({
        sessionId: joi_1.default.string().required(),
    }),
    [Socket_1.SOCKET_EVENT_CLIENT.SEND_GAME_IN_PROGRESS_LIST]: joi_1.default.any(),
    [Socket_1.SOCKET_EVENT_CLIENT.SEND_GAME_STATUS]: joi_1.default.object({
        sessionId: joi_1.default.string().required(),
    }),
    [Socket_1.SOCKET_EVENT_CLIENT.CHANGE_PLAYER_COLOR]: joi_1.default.object({
        color: joi_1.default.string()
            .valid(...Object.values(PLAYER_COLOR_1.PLAYER_COLOR))
            .required(),
        sessionId: joi_1.default.string().required(),
    }),
    [Socket_1.SOCKET_EVENT_CLIENT.SEND_SAVE_LIST]: joi_1.default.any(),
    [Socket_1.SOCKET_EVENT_CLIENT.SAVE_GAME]: joi_1.default.object({
        sessionId: joi_1.default.string().required(),
    }),
    [Socket_1.SOCKET_EVENT_CLIENT.LOAD_SAVE]: joi_1.default.object({
        saveId: joi_1.default.string().required(),
    }),
    [Socket_1.SOCKET_EVENT_CLIENT.DELETE_SAVE]: joi_1.default.object({
        saveId: joi_1.default.string().required(),
    }),
};
//# sourceMappingURL=PayloadSchemas.js.map