"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatherAdventureCard = void 0;
const AdventureCard_1 = require("../../../AdventureCard");
const ACTION_1 = require("../../../../../../../shared/types/Game/ACTION");
class GatherAdventureCard extends AdventureCard_1.AdventureCard {
    constructor(name, namePL, decide, game, option1Label, option2Label) {
        super(name, namePL, decide, game, option1Label, option2Label);
        this._action = ACTION_1.ACTION.GATHER;
    }
    get action() {
        return this._action;
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
    getSide() {
        var _a, _b;
        const side = (_b = (_a = this._game.adventureService.currentAdventure) === null || _a === void 0 ? void 0 : _a.relatedActionInfo) === null || _b === void 0 ? void 0 : _b.source;
        if (side) {
            return side;
        }
        else {
            throw new Error("Can't get side from adventureService.");
        }
    }
}
exports.GatherAdventureCard = GatherAdventureCard;
//# sourceMappingURL=GatherAdventureCard.js.map