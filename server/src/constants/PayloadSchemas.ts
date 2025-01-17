import { CONTROLLER_ACTION_OBJECT } from "@shared/types/CONTROLLER_ACTION";
import { PLAYER_COLOR } from "@shared/types/Game/PLAYER_COLOR";
import { SCENARIO } from "@shared/types/Game/ScenarioService/SCENARIO";
import { SOCKET_EVENT_CLIENT } from "@shared/types/Requests/Socket";
import Joi from "joi";
import { sharedConfig } from "@shared/config/sharedConfig";

const { session } = sharedConfig;

const password = Joi.string().allow("").max(session.passwordMaxLength);

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
				.max(session.nameMaxLength)
				.min(session.nameMinLength),
			quickGame: Joi.boolean(),
			private: Joi.boolean().required(),
			password,
			maxPlayers: Joi.number()
				.required()
				.max(session.maxPlayers)
				.min(session.minPlayers),
			difficultySettings: Joi.object({
				dog: Joi.boolean().required(),
				friday: Joi.boolean().required(),
				startingEquipment: Joi.number()
					.required()
					.min(sharedConfig.session.minStartingEqipment)
					.max(sharedConfig.session.maxStartingEquipment),
				scaled: Joi.boolean().required()
			}).required(),
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
			scenario: Joi.string().valid(...Object.values(SCENARIO)),
			name: Joi.string()
				.max(session.nameMaxLength)
				.min(session.nameMinLength),
			quickGame: Joi.boolean(),
			private: Joi.boolean(),
			password,
			maxPlayers: Joi.number()
				.max(session.maxPlayers)
				.min(session.minPlayers),
			difficultySettings: Joi.object({
				dog: Joi.boolean(),
				friday: Joi.boolean(),
				startingEquipment: Joi.number().min(0).max(4),
				scaled: Joi.boolean()
			}),
			
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
	[SOCKET_EVENT_CLIENT.RESTART_GAME]: Joi.object({
		sessionId: Joi.string().required(),
	}),
	[SOCKET_EVENT_CLIENT.TERMINATE_GAME]: Joi.object({
		sessionId: Joi.string().required(),
	}),
	[SOCKET_EVENT_CLIENT.CHANGE_USER_PREFERENCES]: Joi.object({
		preferences: Joi.object().required(),
	}),
};
