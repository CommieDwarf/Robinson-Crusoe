"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drought = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("../../../../../shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("../../../../../shared/types/Game/InventionService/Invention");
const ITile_1 = require("../../../../../shared/types/Game/TileService/ITile");
class Drought extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.DROUGHT, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.SHOVEL,
            construction: null,
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "susza";
        this._resolutionPL = "nowe koryto";
    }
    triggerEventEffect() {
        const tiles = this._game.tileService.tiles.filter((tile) => { var _a; return ((_a = tile.tileResourceService) === null || _a === void 0 ? void 0 : _a.terrainType) === ITile_1.TERRAIN_TYPE.RIVER; });
        if (tiles.length > 0) {
            this._game.tileService.markTilesForAction(tiles, ITile_1.TILE_ACTION.DEPLETE_TERRAIN_TYPE, 1, this._name, false);
        }
    }
    triggerThreatEffect() {
        this.triggerEventEffect();
    }
    fullFill() {
        const tile = this._game.tileService.tiles.find((tile) => { var _a; return ((_a = tile.modifiers.terrainDepleted) === null || _a === void 0 ? void 0 : _a.source) === this._name; });
        if (tile) {
            //TODO: ogarnij tłumaczenie
            tile.unsetTileModifier("terrainDepleted", this._resolutionPL);
        }
        this.incrDetermination(1);
    }
}
exports.Drought = Drought;
//# sourceMappingURL=Drought.js.map