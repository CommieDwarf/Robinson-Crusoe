"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlaskOfRum = void 0;
const Item_1 = require("../Item");
const Item_2 = require("@shared/types/Game/Equipment/Item");
class FlaskOfRum extends Item_1.Item {
    constructor(game) {
        super(Item_2.ITEM.FLASK_OF_RUM, game);
    }
    use(character, target) {
        if (this._game.phaseService.phase !== "night") {
            return;
        }
        else {
            super.use(character);
            this._game.characterService.heal(character, 1, this.name);
        }
    }
}
exports.FlaskOfRum = FlaskOfRum;
//# sourceMappingURL=FlaskOfRum.js.map