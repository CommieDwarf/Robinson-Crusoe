import { SkillService } from "./SkillService/SkillService";
import { ISkillService } from "../../../../interfaces/SkillService/SkillService";
import { IGame } from "../../../../interfaces/Game";
import { ICharacter } from "../../../../interfaces/Characters/Character";

// TODO: NOT IMPLEMENTED.
export class Explorer extends SkillService implements ISkillService {
  _skills = new Map();

  constructor(game: IGame, character: ICharacter) {
    super(game, character);
  }
}