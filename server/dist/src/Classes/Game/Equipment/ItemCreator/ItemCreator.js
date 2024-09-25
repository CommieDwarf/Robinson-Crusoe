"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCreator = void 0;
const Item_1 = require("@shared/types/Game/Equipment/Item");
const Bible_1 = require("./Items/Bible");
const Biscuits_1 = require("./Items/Biscuits");
const EmptyBottle_1 = require("./Items/EmptyBottle");
const FlaskOfRum_1 = require("./Items/FlaskOfRum");
const Hammer_1 = require("./Items/Hammer");
const Pistol_1 = require("./Items/Pistol");
const StormGlass_1 = require("./Items/StormGlass");
const Tobacco_1 = require("./Items/Tobacco");
class ItemCreator {
    constructor(game) {
        this._game = game;
    }
    create(item) {
        switch (item) {
            case Item_1.ITEM.BIBLE:
                return new Bible_1.Bible(this._game);
            case Item_1.ITEM.BISCUITS:
                return new Biscuits_1.Biscuits(this._game);
            case Item_1.ITEM.EMPTY_BOTTLE:
                return new EmptyBottle_1.EmptyBottle(this._game);
            case Item_1.ITEM.FLASK_OF_RUM:
                return new FlaskOfRum_1.FlaskOfRum(this._game);
            case Item_1.ITEM.HAMMER:
                return new Hammer_1.Hammer(this._game);
            case Item_1.ITEM.PISTOL:
                return new Pistol_1.Pistol(this._game);
            case Item_1.ITEM.STORM_GLASS:
                return new StormGlass_1.StormGlass(this._game);
            case Item_1.ITEM.TOBACCO:
                return new Tobacco_1.Tobacco(this._game);
        }
    }
}
exports.ItemCreator = ItemCreator;
//# sourceMappingURL=ItemCreator.js.map