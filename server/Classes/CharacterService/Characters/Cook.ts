import { PlayerCharacter } from "./Character/PlayerCharacter/PlayerCharacter";
import {
  IPlayerCharacter,
  PlayerCharacterName,
} from "../../../../interfaces/Characters/PlayerCharacter";
import { IGame } from "../../../../interfaces/Game";
import { CHARACTER, Gender } from "../../../../interfaces/Characters/Character";
import { IPlayer } from "../../../../interfaces/PlayerService/Player";
import { GrandmasRecipe } from "./Skills/Cook/GrandmasRecipe";
import { Hooch } from "./Skills/Cook/Hooch";
import { Scrounger } from "./Skills/Cook/Scrounger";
import { StoneSoup } from "./Skills/Cook/StoneSoup";
import { ISkill } from "../../../../interfaces/Skill/Skill";

export class Cook extends PlayerCharacter implements IPlayerCharacter {
  protected readonly _skills: ISkill[];

  constructor(gender: Gender, game: IGame, player: IPlayer) {
    super(CHARACTER.COOK, "Kucharz", 2, 13, game, gender, [2, 4, 6, 9], player);
    this._skills = this.initSkills();
  }

  get skills(): ISkill[] {
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
