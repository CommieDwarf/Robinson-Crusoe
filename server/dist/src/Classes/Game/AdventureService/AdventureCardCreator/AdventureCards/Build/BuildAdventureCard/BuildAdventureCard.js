"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildAdventureCard = void 0;
const AdventureCard_1 = require("../../../AdventureCard");
const ACTION_1 = require("@shared/types/Game/ACTION");
class BuildAdventureCard extends AdventureCard_1.AdventureCard {
    constructor(name, eventName, decide, game, option1Label, option2Label) {
        super(name, eventName, decide, game, option1Label, option2Label);
        this._action = ACTION_1.ACTION.BUILD;
    }
}
exports.BuildAdventureCard = BuildAdventureCard;
//# sourceMappingURL=BuildAdventureCard.js.map