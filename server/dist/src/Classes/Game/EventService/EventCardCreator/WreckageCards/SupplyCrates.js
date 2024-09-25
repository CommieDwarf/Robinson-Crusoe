"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplyCrates = void 0;
const EventCard_1 = require("../EventCard");
const EventCard_2 = require("@shared/types/Game/EventService/EventCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
class SupplyCrates extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.WRECKAGE_CARD.SUPPLY_CRATES, EventCard_2.EVENT_TYPE.WRECKAGE, {
            optionalResource: null,
            pawns: 1,
            invention: null,
            construction: null,
            resource: null
        }, game);
        this._namePL = "skrzynie z jedzeniem";
        this._resolutionPL = "wyprawa po jedzenie";
    }
    triggerEventEffect() {
        return;
    }
    triggerThreatEffect() {
        return;
    }
    fullFill() {
        this._game.resourceService.addBasicResourceToOwned("food", 1, this.name);
        const helper = this.getHelperPawn();
        if (helper) {
            this._game.resourceService.addBasicResourceToOwned("dryFood", 1, this.name);
        }
    }
}
exports.SupplyCrates = SupplyCrates;
//# sourceMappingURL=SupplyCrates.js.map