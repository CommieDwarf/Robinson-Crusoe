"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileController = void 0;
const CONTROLLER_ACTION_1 = require("@shared/types/CONTROLLER_ACTION");
class TileController {
    getActionHandlers() {
        const handlers = new Map();
        handlers.set(CONTROLLER_ACTION_1.TILE_CONTROLLER_ACTION.MOVE_CAMP, this.moveCamp.bind(this));
        handlers.set(CONTROLLER_ACTION_1.TILE_CONTROLLER_ACTION.TRIGGER_TILE_ACTION, this.triggerTileAction.bind(this));
        handlers.set(CONTROLLER_ACTION_1.TILE_CONTROLLER_ACTION.TRIGGER_TILE_RESOURCE_ACTION, this.triggerTileResourceAction.bind(this));
        return handlers;
    }
    constructor(game) {
        this._game = game;
    }
    triggerTileAction(player, tileId) {
        this._game.tileService.triggerMarkedAction(tileId);
    }
    triggerTileResourceAction(player, tileID, side) {
        this._game.tileService.triggerMarkedResourceAction(tileID, side);
    }
    moveCamp(player, tileID) {
        this._game.tileService.moveCamp(tileID);
    }
}
exports.TileController = TileController;
//# sourceMappingURL=TileController.js.map