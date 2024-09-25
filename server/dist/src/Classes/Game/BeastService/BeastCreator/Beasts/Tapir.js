"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tapir = void 0;
const Beast_1 = require("../Beast");
const Beast_2 = require("@shared/types/Game/Beasts/Beast");
const BasicResources_1 = require("../../../ResourceService/BasicResources");
class Tapir extends Beast_1.Beast {
    constructor(game) {
        super(Beast_2.BEAST.TAPIR, 3, 1, new BasicResources_1.BasicResources(2, 0, 0, 1), game);
    }
}
exports.Tapir = Tapir;
//# sourceMappingURL=Tapir.js.map