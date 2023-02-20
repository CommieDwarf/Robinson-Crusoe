import { ISkill } from "../../../../interfaces/Skill/Skill";
import { CHARACTER, Gender } from "../../../../interfaces/Characters/Character";
import { IGame } from "../../../../interfaces/Game";

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
