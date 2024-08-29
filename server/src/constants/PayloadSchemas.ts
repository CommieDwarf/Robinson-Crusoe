import { CONTROLLER_ACTION_OBJECT } from "@shared/types/CONTROLLER_ACTION";
import { PLAYER_COLOR } from "@shared/types/Game/PLAYER_COLOR";
import { SCENARIO } from "@shared/types/Game/ScenarioService/SCENARIO";
import { SOCKET_EVENT_CLIENT } from "@shared/types/Requests/Socket";
import Joi from "joi";
import { VALIDATION_CONFIG } from "@shared/constants/VALIDATION_CONFIG";





const password = Joi.string().allow("").max(
	VALIDATION_CONFIG.MAX_PASSWORD_LENGTH
);

const settings = {
	
}

export const ClientPayloadSchemas = {
	[SOCKET_EVENT_CLIENT.EXECUTE_PLAYER_ACTION]: Joi.object({
		actionType: Joi.string()
			.valid(...Object.values(CONTROLLER_ACTION_OBJECT))
			.required(),
		arguments: Joi.array().items(Joi.any()).required(),
		sessionId: Joi.string().required(),
	}),
	[SOCKET_EVENT_CLIENT.SEND_QUICK_GAME_STATUS]: Joi.any(),
	[SOCKET_EVENT_CLIENT.CREATE_SESSION]: Joi.object({
		settings: Joi.object({
			scenario: Joi.string()
				.valid(...Object.values(SCENARIO))
				.required(),
			name: Joi.string()
				.required()
				.max(VALIDATION_CONFIG.MAX_NAME_LENGTH),
			quickGame: Joi.boolean().required(),
			private: Joi.boolean().required(),
			password,
			maxPlayers: Joi.number()
				.required()
				.max(VALIDATION_CONFIG.MAX_PLAYERS)
				.min(VALIDATION_CONFIG.MIN_PLAYERS),
		}).required(),
	}),
	[SOCKET_EVENT_CLIENT.CREATE_QUICK_GAME]: Joi.any(),
	[SOCKET_EVENT_CLIENT.SEND_SESSION_DATA]: Joi.object({
		sessionId: Joi.string().required(),
	}),
	[SOCKET_EVENT_CLIENT.DISCONNECT]: Joi.any(),
	[SOCKET_EVENT_CLIENT.SEND_SESSION_LIST]: Joi.any(),
	[SOCKET_EVENT_CLIENT.JOIN_SESSION]: Joi.object({
		sessionId: Joi.string().required(),
		password,
	}),
	[SOCKET_EVENT_CLIENT.JOIN_SESSION_BY_CODE]: Joi.object({
		code: Joi.string().required(),
		password,
	}),
	[SOCKET_EVENT_CLIENT.LEAVE_SESSION]: Joi.object({
		sessionId: Joi.string().required(),
	}),
	[SOCKET_EVENT_CLIENT.CHANGE_CHARACTER]: Joi.object({
		sessionId: Joi.string().required(),
		character: Joi.object().unknown(true), // Partial<AssignedCharacter>
	}),
	[SOCKET_EVENT_CLIENT.SET_PLAYER_READY]: Joi.object({
		sessionId: Joi.string().required(),
		value: Joi.boolean().required(),
	}),
	[SOCKET_EVENT_CLIENT.KICK_PLAYER]: Joi.object({
		sessionId: Joi.string().required(),
		playerId: Joi.string().required(),
	}),
	[SOCKET_EVENT_CLIENT.PONG]: Joi.object({
		timestamp: Joi.number().required(),
	}),
	[SOCKET_EVENT_CLIENT.SEND_MESSAGE]: Joi.object({
		sessionId: Joi.string().required(),
		message: Joi.string().required(),
	}),
	[SOCKET_EVENT_CLIENT.UPDATE_SESSION_SETTINGS]: Joi.object({
		sessionId: Joi.string().required(),
		settings: Joi.object({
			scenario: Joi.string()
				.valid(...Object.values(SCENARIO)),
			name: Joi.string()
				.max(VALIDATION_CONFIG.MAX_NAME_LENGTH),
			quickGame: Joi.boolean(),
			private: Joi.boolean(),
			password,
			maxPlayers: Joi.number()
				.max(VALIDATION_CONFIG.MAX_PLAYERS)
				.min(VALIDATION_CONFIG.MIN_PLAYERS),
		}).required(),
	}),
	[SOCKET_EVENT_CLIENT.START_GAME]: Joi.object({
		sessionId: Joi.string().required(),
	}),
	[SOCKET_EVENT_CLIENT.SEND_GAME_IN_PROGRESS_LIST]: Joi.any(),
	[SOCKET_EVENT_CLIENT.SEND_GAME_STATUS]: Joi.object({
		sessionId: Joi.string().required(),
	}),
	[SOCKET_EVENT_CLIENT.CHANGE_PLAYER_COLOR]: Joi.object({
		color: Joi.string()
			.valid(...Object.values(PLAYER_COLOR))
			.required(),
		sessionId: Joi.string().required(),
	}),
	[SOCKET_EVENT_CLIENT.SEND_SAVE_LIST]: Joi.any(),
	[SOCKET_EVENT_CLIENT.SAVE_GAME]: Joi.object({
		sessionId: Joi.string().required(),
	}),
	[SOCKET_EVENT_CLIENT.LOAD_SAVE]: Joi.object({
		saveId: Joi.string().required(),
	}),
	[SOCKET_EVENT_CLIENT.DELETE_SAVE]: Joi.object({
		saveId: Joi.string().required(),
	}),
};
