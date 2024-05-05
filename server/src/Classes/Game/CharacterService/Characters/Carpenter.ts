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
import {ANewIdea} from "./Skills/Carpenter/ANewIdea";
import {Craftsmanship} from "./Skills/Carpenter/Craftsmanship";
import {EconomicalConstruction} from "./Skills/Carpenter/EconomicalConstruction";
import {Handyman} from "./Skills/Carpenter/Handyman";

export class Carpenter extends PlayerCharacter implements IPlayerCharacter {
    protected readonly _skills: IAbility<any>[];

    constructor(gender: Gender, game: IGame, player: IPlayer) {
        super(CHARACTER.CARPENTER, 2, 13, game, gender, [3, 5, 8], player);
        this._skills = this.initSkills();
    }

    get abilities(): IAbility<any>[] {
        return this._skills;
    }

    private initSkills() {
        const skills = [];
        skills.push(new ANewIdea(this._game, this));
        skills.push(new Craftsmanship(this._game, this));
        skills.push(new EconomicalConstruction(this._game, this));
        skills.push(new Handyman(this._game, this));
        return skills;
    }
}
