"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedTroubles = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class UnexpectedTroubles extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.UNEXPECTED_TROUBLES, "", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        var _a, _b;
        const tileId = (_b = (_a = this._game.adventureService.currentAdventure) === null || _a === void 0 ? void 0 : _a.relatedActionInfo) === null || _b === void 0 ? void 0 : _b.tileId;
        if (tileId !== undefined) {
            this._game.tileService.getTile(tileId).setTileModifier("terrainDepleted", this._name);
        }
        else {
            throw new Error("Can't get tile id from currentAdventure");
        }
    }
}
exports.UnexpectedTroubles = UnexpectedTroubles;
//# sourceMappingURL=UnexpectedTroubles.js.map