import {PlayerCharacter} from "./Character/PlayerCharacter/PlayerCharacter";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IGame} from "@shared/types/Game/Game";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {GrandmasRecipe} from "./Skills/Cook/GrandmasRecipe";
import {Hooch} from "./Skills/Cook/Hooch";
import {Scrounger} from "./Skills/Cook/Scrounger";
import {StoneSoup} from "./Skills/Cook/StoneSoup";
import {IAbility} from "@shared/types/Game/Skill/IAbility";

export class Cook extends PlayerCharacter implements IPlayerCharacter {
    protected readonly _skills: IAbility<any>[];

    constructor(gender: Gender, game: IGame, player: IPlayer) {
        super(CHARACTER.COOK, "Kucharz", 2, 13, game, gender, [2, 4, 6, 9], player);
        this._skills = this.initSkills();
    }

    get skills(): IAbility<any>[] {
        return this._skills;
    }

    private initSkills() {
        const skills = [];
        skills.push(new GrandmasRecipe(this._game, this));
        skills.push(new Hooch(this._game, this));
        skills.push(new Scrounger(this._game, this));
        skills.push(new StoneSoup(this._game, this));
        return skills;
    }
}
