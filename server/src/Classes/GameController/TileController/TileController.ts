import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {Side} from "@shared/types/Game/TileService/TileResourceService";
import {TILE_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {IGame} from "@shared/types/Game/Game";
import {ActionHandler, GameControllerInterface} from "../../../shared/types/GameController/Controllers";


export class TileController implements GameControllerInterface {
    private readonly _game: IGame;

    getActionHandlers() {
        const handlers = new Map<TILE_CONTROLLER_ACTION, ActionHandler>();
        handlers.set(TILE_CONTROLLER_ACTION.MOVE_CAMP, this.moveCamp.bind(this));
        handlers.set(TILE_CONTROLLER_ACTION.TRIGGER_TILE_ACTION, this.triggerTileAction.bind(this));
        handlers.set(TILE_CONTROLLER_ACTION.TRIGGER_TILE_RESOURCE_ACTION, this.triggerTileResourceAction.bind(this));
        return handlers;
    }

    constructor(game: IGame) {
        this._game = game;
    }

    private triggerTileAction(player: IPlayer, tileId: number): void {
        this._game.tileService.triggerMarkedAction(tileId);
    }

    private triggerTileResourceAction(player: IPlayer, tileID: number, side: Side): void {
        this._game.tileService.triggerMarkedResourceAction(tileID, side);
    }

    private moveCamp(player: IPlayer, tileID: number): void {
        this._game.tileService.moveCamp(tileID);
    }
}
