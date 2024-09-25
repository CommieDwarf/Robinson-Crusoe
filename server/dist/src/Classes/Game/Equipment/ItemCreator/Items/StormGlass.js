"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StormGlass = void 0;
const Item_1 = require("../Item");
const Item_2 = require("@shared/types/Game/Equipment/Item");
class StormGlass extends Item_1.Item {
    constructor(game) {
        super(Item_2.ITEM.STORM_GLASS, game);
    }
    use(character, target) {
        super.use(character);
        //TODO: implement weather dice before action Phase.
    }
}
exports.StormGlass = StormGlass;
//# sourceMappingURL=StormGlass.js.map