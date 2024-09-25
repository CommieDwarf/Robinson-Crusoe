"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biscuits = void 0;
const Item_1 = require("../Item");
const Item_2 = require("@shared/types/Game/Equipment/Item");
class Biscuits extends Item_1.Item {
    constructor(game) {
        super(Item_2.ITEM.BISCUITS, game);
    }
    use(character, target) {
        super.use(character);
        this._game.resourceService.addBasicResourceToOwned("dryFood", 1, this.name);
    }
}
exports.Biscuits = Biscuits;
//# sourceMappingURL=Biscuits.js.map