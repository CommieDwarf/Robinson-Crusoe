"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExploreAdventureCard = void 0;
const ACTION_1 = require("../../../../../../../shared/types/Game/ACTION");
const AdventureCard_1 = require("../../../AdventureCard");
class ExploreAdventureCard extends AdventureCard_1.AdventureCard {
    constructor(name, namePL, decide, game, option1Label, option2Label) {
        super(name, namePL, decide, game, option1Label, option2Label);
        this._action = ACTION_1.ACTION.EXPLORE;
    }
    getTile() {
        var _a, _b;
        const id = (_b = (_a = this._game.adventureService.currentAdventure) === null || _a === void 0 ? void 0 : _a.relatedActionInfo) === null || _b === void 0 ? void 0 : _b.tileId;
        if (id) {
            return this._game.tileService.getTile(id);
        }
        else {
            throw new Error("Can't find related tile. Id: " + id);
        }
    }
}
exports.ExploreAdventureCard = ExploreAdventureCard;
//# sourceMappingURL=ExploreAdventureCard.js.map