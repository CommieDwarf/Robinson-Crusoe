import { Skill } from "../Skill/Skill";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/PlayerCharacter";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";
import { hooch } from "../../../../../../constants/SkillDescriptions/Cook";
import { PHASE } from "../../../../../../interfaces/PhaseService/Phase";

export class Scrounger extends Skill implements ISkill {
  private _character: IPlayerCharacter;

  constructor(game: IGame, character: IPlayerCharacter) {
    super(
      hooch.name,
      hooch.namePL,
      hooch.description,
      hooch.quote,
      [PHASE.ACTION],
      "gather",
      2,
      game
    );
    this._character = character;
  }

  use(target: ICharacter | null = null) {
    if (!target) {
      return;
    }
    //TODO: implement reRoll
  }
}
