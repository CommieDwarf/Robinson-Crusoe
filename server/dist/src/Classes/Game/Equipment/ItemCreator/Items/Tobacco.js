"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tobacco = void 0;
const Item_1 = require("../Item");
const Item_2 = require("../../../../../shared/types/Game/Equipment/Item");
class Tobacco extends Item_1.Item {
    constructor(game) {
        super(Item_2.ITEM.TOBACCO, game);
    }
    use(character, target) {
        super.use(character);
        this._game.characterService.incrDetermination(character, 2, this.name);
    }
}
exports.Tobacco = Tobacco;
//# sourceMappingURL=Tobacco.js.map