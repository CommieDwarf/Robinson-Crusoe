"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Explorer = void 0;
const PlayerCharacter_1 = require("./Character/PlayerCharacter/PlayerCharacter");
const Character_1 = require("@shared/types/Game/Characters/Character");
const Lucky_1 = require("./Skills/Explorer/Lucky");
const MotivationalSpeech_1 = require("./Skills/Explorer/MotivationalSpeech");
const Reconnaissance_1 = require("./Skills/Explorer/Reconnaissance");
const Scouting_1 = require("./Skills/Explorer/Scouting");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
class Explorer extends PlayerCharacter_1.PlayerCharacter {
    constructor(gender, game, player) {
        super(Character_1.CHARACTER.EXPLORER, 3, 12, game, gender, [1, 6], Invention_1.INVENTION_PERSONAL.SHORTCUT, player);
        this._skills = this.initSkills();
    }
    get abilities() {
        return this._skills;
    }
    initSkills() {
        return [
            new Lucky_1.Lucky(this._game, this),
            new MotivationalSpeech_1.MotivationalSpeech(this._game, this),
            new Reconnaissance_1.Reconnaissance(this._game, this),
            new Scouting_1.Scouting(this._game, this)
        ];
    }
}
exports.Explorer = Explorer;
//# sourceMappingURL=Explorer.js.map