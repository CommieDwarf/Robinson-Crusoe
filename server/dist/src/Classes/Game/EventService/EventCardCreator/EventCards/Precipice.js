"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Precipice = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
const ITile_1 = require("../../../../../shared/types/Game/TileService/ITile");
class Precipice extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.PRECIPICE, ACTION_1.ACTION.EXPLORE, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: "wood",
            optionalResource: "wood",
        }, game);
        this._namePL = "przepaść";
        this._resolutionPL = "budowa mostu";
    }
    triggerEventEffect() {
        const tiles = this._game.tileService.tilesAroundCamp;
        this._game.tileService.markTilesForAction(tiles, ITile_1.TILE_ACTION.FLIP, 1, this._name, false);
    }
    triggerThreatEffect() {
        //tile stays unavailable
    }
    fullFill() {
        const tile = this._game.tileService.tiles.find((tile) => { var _a; return ((_a = tile.modifiers.flipped) === null || _a === void 0 ? void 0 : _a.source) === this._name; });
        if (tile) {
            tile.unsetTileModifier("flipped", this._resolutionPL);
        }
        this.incrDetermination(3);
    }
}
exports.Precipice = Precipice;
//# sourceMappingURL=Precipice.js.map