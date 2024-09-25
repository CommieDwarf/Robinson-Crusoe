"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bible = void 0;
const Item_1 = require("../Item");
const Item_2 = require("@shared/types/Game/Equipment/Item");
class Bible extends Item_1.Item {
    constructor(game) {
        super(Item_2.ITEM.BIBLE, game);
    }
    use(character, target) {
        super.use(character, target);
    }
}
exports.Bible = Bible;
//# sourceMappingURL=Bible.js.map