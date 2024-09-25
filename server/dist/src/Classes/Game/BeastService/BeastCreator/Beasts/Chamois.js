"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chamois = void 0;
const Beast_1 = require("../Beast");
const Beast_2 = require("../../../../../shared/types/Game/Beasts/Beast");
const BasicResources_1 = require("../../../ResourceService/BasicResources");
class Chamois extends Beast_1.Beast {
    constructor(game) {
        super(Beast_2.BEAST.CHAMOIS, 5, 1, new BasicResources_1.BasicResources(3, 0, 0, 2), game);
    }
}
exports.Chamois = Chamois;
//# sourceMappingURL=Chamois.js.map