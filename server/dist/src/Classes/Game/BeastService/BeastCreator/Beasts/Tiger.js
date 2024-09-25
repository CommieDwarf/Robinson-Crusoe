"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tiger = void 0;
const Beast_1 = require("../Beast");
const Beast_2 = require("@shared/types/Game/Beasts/Beast");
const BasicResources_1 = require("../../../ResourceService/BasicResources");
class Tiger extends Beast_1.Beast {
    constructor(game) {
        super(Beast_2.BEAST.TIGER, 6, 2, new BasicResources_1.BasicResources(5, 0, 0, 2), game);
    }
}
exports.Tiger = Tiger;
//# sourceMappingURL=Tiger.js.map