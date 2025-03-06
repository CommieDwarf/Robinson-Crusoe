export enum ACTION_CONTROLLER_ACTION {
	SET_BIBLE_USAGE = "set bible usage",
	SET_NEXT_ACTION = "set next action",
	ROLL_ACTION_DICES = "roll action dices",
	RESOLVE_ACTION = "resolve action",
	RESOLVE_ADVENTURE = "resolve adventure",
	REROLL_SUCCESS = "reroll success",
	REROLL_ACTION_DICE = "reroll dice",
}

export enum CHARACTER_CONTROLLER_ACTION {
	MOVE_PAWN = "set pawn",
	REMOVE_HEALTH_THRESHOLD = "remove health threshold",
	USE_ABILITY = "use ability",
}

export enum MYSTERY_CONTROLLER_ACTION {
	RESOLVE_EVENT_MYSTERY = "resolve event mystery",
	TRIGGER_MYSTERY_DRAW_EFFECT = "trigger mystery draw effect",
	USE_TREASURE_CARD = "use treasure card",
	DRAW_MYSTERY_CARD = "draw mystery card",
	FINISH_DRAWING_MYSTERY_CARDS = "finish drawing mystery cards",
	MANAGE_CARD_STORAGE = "manage card storage",
}

export enum TILE_CONTROLLER_ACTION {
	TRIGGER_TILE_ACTION = "trigger tile action",
	TRIGGER_TILE_RESOURCE_ACTION = "trigger tile resource action",
	MOVE_CAMP = "move camp",
}

export enum OTHER_CONTROLLER_ACTION {
	ADD_WOOD_TO_PILE = "add wood to pile",
	RESOLVE_EVENT_ADVENTURE = "resolve event adventure",
	ROLL_WEATHER_DICES = "roll weather dices",
	SET_NEXT_PHASE = "set next phase",
	SWITCH_COMMITTED_RESOURCES_TYPE = "switch committed resources type",
	USE_INVENTION = "use invention",
	USE_ITEM = "use item",
	USE_DISCOVERY_TOKEN = "use discovery token",
	PICK_OBJECT = "pick object",
}

export const CONTROLLER_ACTION_OBJECT = {
	...ACTION_CONTROLLER_ACTION,
	...CHARACTER_CONTROLLER_ACTION,
	...MYSTERY_CONTROLLER_ACTION,
	...TILE_CONTROLLER_ACTION,
	...OTHER_CONTROLLER_ACTION,
};

export type CONTROLLER_ACTION =
	| ACTION_CONTROLLER_ACTION
	| CHARACTER_CONTROLLER_ACTION
	| MYSTERY_CONTROLLER_ACTION
	| TILE_CONTROLLER_ACTION
	| OTHER_CONTROLLER_ACTION;
