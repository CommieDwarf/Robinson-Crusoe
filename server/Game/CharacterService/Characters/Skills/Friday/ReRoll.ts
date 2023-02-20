import { Skill } from "../Skill/Skill";
import { ISkill } from "../../../../../../interfaces/Skill/Skill";
import { IGame } from "../../../../../../interfaces/Game";
import { PHASE } from "../../../../../../interfaces/PhaseService/Phase";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";
import { ISideCharacter } from "../../../../../../interfaces/Characters/SideCharacter";
import { ActionDice } from "../../../../../../interfaces/RollDice/RollDice";

export class ReRoll extends Skill implements ISkill {
  private _character: ISideCharacter;

  constructor(game: IGame, character: ISideCharacter) {
    super(
      "reRoll",
      "Przerzut dowolnej kości akcji",
      "",
      "",
      [PHASE.ACTION],
      null,
      2,
      game
    );
    this._character = character;
  }

  use(target: ICharacter | ActionDice | null) {
    //TODO: implement
  }
}
