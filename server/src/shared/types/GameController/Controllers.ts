import { IPlayer } from "@shared/types/Game/PlayerService/Player";
import { CONTROLLER_ACTION } from "@shared/types/CONTROLLER_ACTION";
import { IGame } from "@shared/types/Game/Game";
import { SaveStep } from "@shared/types/SaveGame";

export type ActionHandler = (player: IPlayer, ...args: any[]) => void;

export interface GameControllerInterface {
	getActionHandlers: () => Map<CONTROLLER_ACTION, ActionHandler>;
}

export interface BaseController {
	handleAction: (
		action: CONTROLLER_ACTION,
		player: IPlayer,
		...args: any[]
	) => void;
	loadBySteps: (steps: SaveStep[]) => void;
	game: IGame;
}
