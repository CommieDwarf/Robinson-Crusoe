"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Birds = void 0;
const Beast_1 = require("../Beast");
const Beast_2 = require("../../../../../shared/types/Game/Beasts/Beast");
const BasicResources_1 = require("../../../ResourceService/BasicResources");
class Birds extends Beast_1.Beast {
    constructor(game) {
        super(Beast_2.BEAST.BIRDS, 1, 0, new BasicResources_1.BasicResources(2, 0, 0, 0), game);
    }
}
exports.Birds = Birds;
//# sourceMappingURL=Birds.js.map