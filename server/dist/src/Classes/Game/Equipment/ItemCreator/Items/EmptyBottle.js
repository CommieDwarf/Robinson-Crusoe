"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyBottle = void 0;
const Item_1 = require("../Item");
const Item_2 = require("@shared/types/Game/Equipment/Item");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
class EmptyBottle extends Item_1.Item {
    constructor(game) {
        super(Item_2.ITEM.EMPTY_BOTTLE, game);
    }
    use(character, target) {
        super.use(character);
        this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.WEAPON, 1, this.name);
    }
}
exports.EmptyBottle = EmptyBottle;
//# sourceMappingURL=EmptyBottle.js.map