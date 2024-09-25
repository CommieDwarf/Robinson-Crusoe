"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrandmasRecipe = void 0;
const Ability_1 = require("../Ability/Ability");
const ABILITY_1 = require("../../../../../../shared/types/Game/Skill/ABILITY");
const Character_1 = require("../../../../../../shared/types/Game/Characters/Character");
class GrandmasRecipe extends Ability_1.Ability {
    constructor(game, character) {
        super(ABILITY_1.ABILITY.GRANDMAS_RECIPE, "all", null, 2, game, character);
    }
    use(target = null) {
        if (this._game.resourceService.canAffordResource("food", 1)) {
            const characters = this._game.characterService.allCharacters.filter((char) => char.name !== Character_1.CHARACTER.DOG);
            this._game.resourceService.spendBasicResourceIfPossible("food", 1, "");
            this._game.startPickingObject(characters, this._character, 1, this._name, "character", (character) => {
                this._game.characterService.heal(character, 2, this._name);
            });
            super.use(null);
        }
    }
}
exports.GrandmasRecipe = GrandmasRecipe;
//# sourceMappingURL=GrandmasRecipe.js.map