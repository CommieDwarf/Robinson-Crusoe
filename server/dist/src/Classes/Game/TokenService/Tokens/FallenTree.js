"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FallenTree = void 0;
const Token_1 = require("./Token/Token");
const Token_2 = require("../../../../shared/types/Game/TokenService/Token");
class FallenTree extends Token_1.Token {
    constructor(game, id) {
        super(game, Token_2.DISCOVERY_TOKEN.FALLEN_TREE, "powalone drzewo", "Otrzymujesz 1 drewno. Żeton zostanie zrealizowany automatycznie po fazie akcji.", id);
    }
    use(character, target) {
        super.use(character, target);
        this._game.resourceService.addBasicResourceToOwned("wood", 1, this._sourceLog);
        this._used = true;
    }
    autoDiscard() {
        if (this._game.phaseService.phase === "weather") {
            this._game.resourceService.addBasicResourceToOwned("wood", 1, this._sourceLog);
            this._used = true;
            super.autoDiscard();
        }
    }
}
exports.FallenTree = FallenTree;
//# sourceMappingURL=FallenTree.js.map