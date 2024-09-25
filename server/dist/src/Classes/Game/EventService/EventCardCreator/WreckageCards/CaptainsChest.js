"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaptainsChest = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
class CaptainsChest extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.WRECKAGE_CARD.CAPTAINS_CHEST, EventCard_2.EVENT_TYPE.WRECKAGE, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "kufer kapitana";
        this._resolutionPL = "wyprawa po skarby";
    }
    triggerEventEffect() {
        // nothing is happening
    }
    triggerThreatEffect() {
        // nothing
    }
    fullFill() {
        const helper = this.getHelperPawn();
        this._game.resourceService.addBasicResourceToOwned("wood", 1, this._resolutionPL);
        if (helper) {
            this._game.equipmentService.addRandomItem(this._resolutionPL);
        }
    }
}
exports.CaptainsChest = CaptainsChest;
//# sourceMappingURL=CaptainsChest.js.map