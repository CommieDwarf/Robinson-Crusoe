"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gorilla = void 0;
const Beast_1 = require("../Beast");
const Beast_2 = require("../../../../../shared/types/Game/Beasts/Beast");
const BasicResources_1 = require("../../../ResourceService/BasicResources");
class Gorilla extends Beast_1.Beast {
    constructor(game) {
        super(Beast_2.BEAST.GORILLA, 6, 3, new BasicResources_1.BasicResources(5, 0, 0, 2), game);
    }
    applySpecialEffect() {
        this._game.tokenService.addRandomTokensToOwned(1);
    }
}
exports.Gorilla = Gorilla;
//# sourceMappingURL=Gorilla.js.map