"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Soldier = void 0;
const PlayerCharacter_1 = require("./Character/PlayerCharacter/PlayerCharacter");
const Character_1 = require("@shared/types/Game/Characters/Character");
const Tracking_1 = require("./Skills/Soldier/Tracking");
const TheHunt_1 = require("./Skills/Soldier/TheHunt");
const Frenzy_1 = require("./Skills/Soldier/Frenzy");
const DefensivePlan_1 = require("./Skills/Soldier/DefensivePlan");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
class Soldier extends PlayerCharacter_1.PlayerCharacter {
    constructor(gender, game, player) {
        super(Character_1.CHARACTER.SOLDIER, 2, 13, game, gender, [3, 7], Invention_1.INVENTION_PERSONAL.SPEAR, player);
        this._skills = this.initSkills();
    }
    get abilities() {
        return this._skills;
    }
    initSkills() {
        return [
            new Tracking_1.Tracking(this._game, this),
            new TheHunt_1.TheHunt(this._game, this),
            new Frenzy_1.Frenzy(this._game, this),
            new DefensivePlan_1.DefensivePlan(this._game, this)
        ];
    }
}
exports.Soldier = Soldier;
//# sourceMappingURL=Soldier.js.map