"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Boa = void 0;
const Beast_1 = require("../Beast");
const Beast_2 = require("../../../../../shared/types/Game/Beasts/Beast");
const BasicResources_1 = require("../../../ResourceService/BasicResources");
class Boa extends Beast_1.Beast {
    constructor(game) {
        super(Beast_2.BEAST.BOA, 2, 2, new BasicResources_1.BasicResources(2, 0, 0, 0), game);
    }
    applySpecialEffect() {
        this._game.tokenService.addRandomTokensToOwned(1);
    }
}
exports.Boa = Boa;
//# sourceMappingURL=Boa.js.map