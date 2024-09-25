"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carpenter = void 0;
const PlayerCharacter_1 = require("./Character/PlayerCharacter/PlayerCharacter");
const Character_1 = require("../../../../shared/types/Game/Characters/Character");
const ANewIdea_1 = require("./Skills/Carpenter/ANewIdea");
const Craftsmanship_1 = require("./Skills/Carpenter/Craftsmanship");
const EconomicalConstruction_1 = require("./Skills/Carpenter/EconomicalConstruction");
const Handyman_1 = require("./Skills/Carpenter/Handyman");
const Invention_1 = require("../../../../shared/types/Game/InventionService/Invention");
class Carpenter extends PlayerCharacter_1.PlayerCharacter {
    constructor(gender, game, player) {
        super(Character_1.CHARACTER.CARPENTER, 2, 13, game, gender, [3, 5, 8], Invention_1.INVENTION_PERSONAL.SNARE, player);
        this._skills = this.initSkills();
    }
    get abilities() {
        return this._skills;
    }
    initSkills() {
        const skills = [];
        skills.push(new ANewIdea_1.ANewIdea(this._game, this));
        skills.push(new Craftsmanship_1.Craftsmanship(this._game, this));
        skills.push(new EconomicalConstruction_1.EconomicalConstruction(this._game, this));
        skills.push(new Handyman_1.Handyman(this._game, this));
        return skills;
    }
}
exports.Carpenter = Carpenter;
//# sourceMappingURL=Carpenter.js.map