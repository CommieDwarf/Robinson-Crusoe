"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudBurst = void 0;
const EventCard_1 = require("../EventCard");
const EVENT_CARD_1 = require("../../../../../shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("../../../../../shared/types/Game/ACTION");
class CloudBurst extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.CLOUDBURST, ACTION_1.ACTION.GATHER, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "oberwane chmury";
        this._resolutionPL = "przeprowadzka";
    }
    triggerEventEffect() {
        if (this._game.tileService.canCampBeMoved()) {
            //TODO: implement
            // this._game.tileService.forceCampMovement();
        }
        else {
            this._game.characterService.hurtAllPlayerCharacters(1, this.name);
        }
    }
    triggerThreatEffect() {
        // nothing happens.
    }
    fullFill() {
        const previousCampTile = this._game.tileService.previousCampTile;
        if (previousCampTile) {
            if (previousCampTile.builtStructures.roof > 0) {
                this._game.tileService.campTile.incrementStructureLvl("roof", 1);
            }
            if (previousCampTile.builtStructures.shelter > 0) {
                this._game.tileService.campTile.incrementStructureLvl("palisade", 1);
            }
        }
    }
}
exports.CloudBurst = CloudBurst;
//# sourceMappingURL=CloudBurst.js.map