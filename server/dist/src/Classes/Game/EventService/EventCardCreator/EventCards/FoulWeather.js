"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoulWeather = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const ACTION_1 = require("@shared/types/Game/ACTION");
const TileResourceService_1 = require("@shared/types/Game/TileService/TileResourceService");
class FoulWeather extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.FOUL_WEATHER, EventCard_2.EVENT_TYPE.BOOK, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.SHOVEL,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "załamanie pogody";
        this._resolutionPL = "zabezpieczenie źródeł";
    }
    triggerEventEffect() {
        this._game.actionService.addGlobalCostModifier(ACTION_1.ACTION.GATHER, "helper", true, this._name);
    }
    triggerThreatEffect() {
        const tiles = this._game.tileService.tilesAroundCamp;
        this._game.tileService.markTileResourcesForAction(tiles, TileResourceService_1.TILE_RESOURCE_ACTION.DEPLETE, this._name, null, 2, true);
    }
    fullFill() {
        this.incrDetermination(1);
    }
}
exports.FoulWeather = FoulWeather;
//# sourceMappingURL=FoulWeather.js.map