import {ISkill} from "@shared/types/Game/Skill/Skill";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {IGame} from "@shared/types/Game/Game";

import {SideCharacter} from "./Character/SideCharacter/SideCharacter";
import {ISideCharacter} from "@shared/types/Game/Characters/SideCharacter";
import {ReRoll} from "./Skills/Friday/ReRoll";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";

export class Friday extends SideCharacter implements ISideCharacter {
    protected readonly _skills: ISkill<ActionDice>[];

    constructor(gender: Gender, game: IGame) {
        super(CHARACTER.FRIDAY, "Piętaszek", 0, 4, game);
        this._skills = this.initSkills();
    }

    get skills(): ISkill<ActionDice>[] {
        return this._skills;
    }

    private initSkills() {
        return [new ReRoll(this._game, this)];
    }
}
