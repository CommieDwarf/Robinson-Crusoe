import { PlayerCharacter } from "./Character/PlayerCharacter/PlayerCharacter";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";
import { ISkill } from "../../../../interfaces/Skill/Skill";
import { CHARACTER, Gender } from "../../../../interfaces/Characters/Character";
import { IGame } from "../../../../interfaces/Game";
import { IPlayer } from "../../../../interfaces/PlayerService/Player";
import { GrandmasRecipe } from "./Skills/Cook/GrandmasRecipe";
import { Hooch } from "./Skills/Cook/Hooch";
import { Scrounger } from "./Skills/Cook/Scrounger";
import { StoneSoup } from "./Skills/Cook/StoneSoup";
import { SideCharacter } from "./Character/SideCharacter/SideCharacter";
import { ISideCharacter } from "../../../../interfaces/Characters/SideCharacter";
import { ReRoll } from "./Skills/Friday/ReRoll";

export class Friday extends SideCharacter implements ISideCharacter {
  protected readonly _skills: ISkill[];

  constructor(gender: Gender, game: IGame) {
    super(CHARACTER.FRIDAY, "Piętaszek", 0, 4, game);
    this._skills = this.initSkills();
  }

  get skills(): ISkill[] {
    return this._skills;
  }

  private initSkills() {
    return [new ReRoll(this._game, this)];
  }
}
