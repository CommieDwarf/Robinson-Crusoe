import { Skill } from "../Skill/Skill";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/PlayerCharacter";
import { IGame } from "../../../../../../interfaces/Game";
import { hooch } from "../../../../../../constants/SkillDescriptions/Cook";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";
import { ISkill } from "../../../../../../interfaces/Skill/Skill";

export class StoneSoup extends Skill implements ISkill {
  private _character: IPlayerCharacter;

  constructor(game: IGame, character: IPlayerCharacter) {
    super(
      hooch.name,
      hooch.namePL,
      hooch.description,
      hooch.quote,
      [],
      null,
      3,
      game
    );
    this._character = character;
  }

  use(target: ICharacter | null = null) {
    if (this._game.phaseService.phase === "action") {
      this._game.resourceService.addResourceToFuture("food", 1, this._namePL);
    } else {
      this._game.resourceService.addResourceToOwned("food", 1, this._namePL);
    }
  }
}
