import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {IGame} from "@shared/types/Game/Game";

import {SideCharacter} from "./Character/SideCharacter/SideCharacter";
import {ISideCharacter} from "@shared/types/Game/Characters/SideCharacter";
import {ReRoll} from "./Skills/Friday/ReRoll";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";

export class Friday extends SideCharacter implements ISideCharacter {
    protected readonly _skills: IAbility<ActionDice>[];

    constructor(gender: Gender, game: IGame) {
        super(CHARACTER.FRIDAY, 0, 4, game);
        this._skills = this.initSkills();
    }

    get abilities(): IAbility<ActionDice>[] {
        return this._skills;
    }

    private initSkills() {
        return [new ReRoll(this._game, this)];
    }
}
