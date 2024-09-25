"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pistol = void 0;
const Item_1 = require("../Item");
const Item_2 = require("@shared/types/Game/Equipment/Item");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
class Pistol extends Item_1.Item {
    constructor(game) {
        super(Item_2.ITEM.PISTOL, game);
    }
    use(character, target) {
        super.use(character);
        this._game.constructionService.getConstruction(Construction_1.CONSTRUCTION.WEAPON).incrTemporaryBoost(3);
    }
}
exports.Pistol = Pistol;
//# sourceMappingURL=Pistol.js.map