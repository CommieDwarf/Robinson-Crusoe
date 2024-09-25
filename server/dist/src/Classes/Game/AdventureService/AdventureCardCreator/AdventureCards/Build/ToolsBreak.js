"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsBreak = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class ToolsBreak extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.TOOLS_BREAK, "broken tools", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        //TODO: implement flip invention
    }
}
exports.ToolsBreak = ToolsBreak;
//# sourceMappingURL=ToolsBreak.js.map