"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alligator = void 0;
const Beast_1 = require("../Beast");
const Beast_2 = require("@shared/types/Game/Beasts/Beast");
const BasicResources_1 = require("../../../ResourceService/BasicResources");
class Alligator extends Beast_1.Beast {
    constructor(game) {
        super(Beast_2.BEAST.ALLIGATOR, 6, 2, new BasicResources_1.BasicResources(3, 0, 0, 0), game);
    }
}
exports.Alligator = Alligator;
//# sourceMappingURL=Alligator.js.map