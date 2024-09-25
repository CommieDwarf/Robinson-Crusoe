"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsInspection = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class ToolsInspection extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.TOOLS_INSPECTION, "kontrola narzędzi", false, game, "shuffle", "");
        this._eventNamePL = "zepsute narzędzia";
    }
    resolveOption1(resolver) {
        //TODO: implement marks on 2 inventions
    }
    triggerEventEffect() {
        //TODO: implement flip marked inventions
    }
}
exports.ToolsInspection = ToolsInspection;
//# sourceMappingURL=ToolsInspection.js.map