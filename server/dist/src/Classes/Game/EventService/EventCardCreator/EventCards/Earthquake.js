"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Earthquake = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("../../../../../shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("../../../../../shared/types/Game/InventionService/Invention");
const ITile_1 = require("../../../../../shared/types/Game/TileService/ITile");
class Earthquake extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.EARTHQUAKE, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.SHOVEL,
            construction: null,
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "trzęsienie ziemi";
        this._resolutionPL = "budowa przejścia";
    }
    triggerEventEffect() {
        const tiles = this._game.tileService.tilesAroundCamp;
        this._game.tileService.markTilesForAction(tiles, ITile_1.TILE_ACTION.FLIP, 1, this._name, false);
    }
    triggerThreatEffect() {
        // tile becomes permanently unavailable
    }
    fullFill() {
        const tile = this._game.tileService.tiles.find((t) => { var _a; return ((_a = t.modifiers.flipped) === null || _a === void 0 ? void 0 : _a.source) === this._name; });
        if (tile) {
            //TODO: ogarnij normalne tlumaczenie
            tile.unsetTileModifier("flipped", this._resolutionPL);
        }
    }
}
exports.Earthquake = Earthquake;
//# sourceMappingURL=Earthquake.js.map