import { Skill } from "../Skill/Skill";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/PlayerCharacter";
import { IGame } from "../../../../../../interfaces/Game";
import { hooch } from "../../../../../../constants/SkillDescriptions/Cook";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";
import { PHASE } from "../../../../../../interfaces/PhaseService/Phase";
import { ISkill } from "../../../../../../interfaces/Skill/Skill";
import { ActionDice } from "../../../../../../interfaces/RollDice/RollDice";

export class Hooch extends Skill implements ISkill {
  private _character: IPlayerCharacter;

  constructor(game: IGame, character: IPlayerCharacter) {
    super(
      hooch.name,
      hooch.namePL,
      hooch.description,
      hooch.quote,
      [PHASE.WEATHER],
      null,
      3,
      game
    );
    this._character = character;
  }

  use(target: IPlayerCharacter | ActionDice | null = null) {
    //TODO: implement
  }
}
