import { SideCharacter } from "./Character/SideCharacter/SideCharacter";
import { ISideCharacter } from "../../../../../interfaces/Characters/SideCharacter";
import { ISkill } from "../../../../../interfaces/Skill/Skill";
import { CHARACTER, Gender } from "../../../../../interfaces/Characters/Character";
import { IGame } from "../../../../../interfaces/Game";

export class Dog extends SideCharacter implements ISideCharacter {
  protected readonly _skills: ISkill[] = [];

  constructor(gender: Gender, game: IGame) {
    super(CHARACTER.DOG, "Pies", 1, Infinity, game);
  }
}
