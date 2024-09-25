"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreasureMysteryCard = void 0;
const MysteryCard_1 = require("../../MysteryCard");
const MysteryCard_2 = require("../../../../../../../shared/types/Game/MysteryService/MysteryCard");
const PawnService_1 = require("../../../../../PawnService/PawnService");
class TreasureMysteryCard extends MysteryCard_1.MysteryCard {
    constructor(game, name, shuffleable, eventName, uses, eventLabel = "", drawLabel = "") {
        super(game, name, shuffleable, eventName, eventLabel, drawLabel);
        this._type = MysteryCard_2.MYSTERY_CARD_TYPE.TREASURE;
        this._pawnService = new PawnService_1.PawnService(this._game, this);
        this._name = name;
        this._uses = uses;
    }
    get renderData() {
        return Object.assign(Object.assign({}, this.getPawnOwnerRenderData()), { pawnService: this._pawnService.renderData });
    }
    getPawnOwnerRenderData() {
        return Object.assign(Object.assign({}, super.getRenderData()), { uses: this._uses });
    }
    get uses() {
        return this._uses;
    }
    get pawnService() {
        return this._pawnService;
    }
    addToResources() {
        if (this._game.phaseService.phase === "action") {
            this._game.resourceService.addTreasureToFuture(this);
        }
        else {
            this._game.resourceService.addTreasureToOwned(this);
        }
    }
    removeFromOwnedResources() {
        this._game.resourceService.removeTreasureFromOwned(this);
    }
}
exports.TreasureMysteryCard = TreasureMysteryCard;
//# sourceMappingURL=TreasureMysteryCard.js.map