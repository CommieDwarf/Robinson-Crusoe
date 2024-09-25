"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cheetah = void 0;
const Beast_1 = require("../Beast");
const Beast_2 = require("@shared/types/Game/Beasts/Beast");
const BasicResources_1 = require("../../../ResourceService/BasicResources");
class Cheetah extends Beast_1.Beast {
    constructor(game) {
        super(Beast_2.BEAST.CHEETAH, 4, 1, new BasicResources_1.BasicResources(2, 0, 0, 1), game);
    }
}
exports.Cheetah = Cheetah;
//# sourceMappingURL=Cheetah.js.map