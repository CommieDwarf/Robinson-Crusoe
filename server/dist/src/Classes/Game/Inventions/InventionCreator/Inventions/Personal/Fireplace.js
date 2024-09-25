"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fireplace = void 0;
const Invention_1 = require("../../Invention");
const Invention_2 = require("../../../../../../shared/types/Game/InventionService/Invention");
class Fireplace extends Invention_1.Invention {
    constructor(game) {
        super(Invention_2.INVENTION_PERSONAL.FIREPLACE, { terrainType: null, inventions: [Invention_2.INVENTION_STARTER.FIRE] }, Invention_2.INVENTION_TYPE.PERSONAL, game);
        this._usable = true;
        this.usedInRound = 0;
    }
    get canBeUsed() {
        const canAfford = this._game.resourceService.canAffordResource("food", 1);
        return (canAfford &&
            this._game.phaseService.phase === "night" &&
            this.usedInRound !== this._game.round);
    }
    use(character) {
        this._game.resourceService.owned.basic.spendResource("food", 1);
        this._game.startPickingObject(this._game.characterService.healableCharacters, character, 1, this._name, "character", (char) => {
            this._game.characterService.heal(char, 2, this._name);
        });
        this.usedInRound = this._game.round;
    }
}
exports.Fireplace = Fireplace;
//# sourceMappingURL=Fireplace.js.map