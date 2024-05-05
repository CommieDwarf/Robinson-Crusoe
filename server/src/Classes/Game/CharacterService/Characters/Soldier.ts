import {PlayerCharacter} from "./Character/PlayerCharacter/PlayerCharacter";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {IGame} from "@shared/types/Game/Game";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {GrandmasRecipe} from "./Skills/Cook/GrandmasRecipe";
import {Hooch} from "./Skills/Cook/Hooch";
import {Scrounger} from "./Skills/Cook/Scrounger";
import {StoneSoup} from "./Skills/Cook/StoneSoup";
import {Tracking} from "./Skills/Soldier/Tracking";
import {TheHunt} from "./Skills/Soldier/TheHunt";
import {Frenzy} from "./Skills/Soldier/Frenzy";
import {DefensivePlan} from "./Skills/Soldier/DefensivePlan";

export class Soldier extends PlayerCharacter implements IPlayerCharacter {
    protected readonly _skills: IAbility<any>[];

    constructor(gender: Gender, game: IGame, player: IPlayer) {
        super(CHARACTER.SOLDIER, 2, 13, game, gender, [3, 7], player);
        this._skills = this.initSkills();
    }

    get abilities(): IAbility<any>[] {
        return this._skills;
    }

    private initSkills() {
        return [
            new Tracking(this._game, this),
            new TheHunt(this._game, this),
            new Frenzy(this._game, this),
            new DefensivePlan(this._game, this)
        ]
    }
}
