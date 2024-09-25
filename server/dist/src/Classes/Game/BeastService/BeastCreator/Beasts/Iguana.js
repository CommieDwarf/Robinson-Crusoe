"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iguana = void 0;
const Beast_1 = require("../Beast");
const Beast_2 = require("@shared/types/Game/Beasts/Beast");
const BasicResources_1 = require("../../../ResourceService/BasicResources");
class Iguana extends Beast_1.Beast {
    constructor(game) {
        super(Beast_2.BEAST.IGUANA, 4, 1, new BasicResources_1.BasicResources(3, 0, 0, 1), game);
    }
    applySpecialEffect() {
        this.getLeader().hurt(1);
    }
}
exports.Iguana = Iguana;
//# sourceMappingURL=Iguana.js.map