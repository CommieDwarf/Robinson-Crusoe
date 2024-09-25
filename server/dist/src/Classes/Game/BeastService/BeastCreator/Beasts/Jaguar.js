"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jaguar = void 0;
const Beast_1 = require("../Beast");
const Beast_2 = require("@shared/types/Game/Beasts/Beast");
const BasicResources_1 = require("../../../ResourceService/BasicResources");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
class Jaguar extends Beast_1.Beast {
    constructor(game) {
        super(Beast_2.BEAST.JAGUAR, 5, 0, new BasicResources_1.BasicResources(4, 0, 0, 1), game);
    }
    applySpecialEffect() {
        if (!this._game.inventionService.getInvention(Invention_1.INVENTION_STARTER.MEDICINE)
            .isBuilt) {
            this.getLeader().hurt(2);
        }
    }
}
exports.Jaguar = Jaguar;
//# sourceMappingURL=Jaguar.js.map