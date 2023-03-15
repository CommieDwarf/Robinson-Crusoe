import { Skill } from "../Skill/Skill";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/PlayerCharacter";
import { IGame } from "../../../../../../interfaces/Game";
import { stoneSoup } from "../../../../../../constants/SkillDescriptions/Cook";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";
import { ISkill } from "../../../../../../interfaces/Skill/Skill";
import { ActionDice } from "../../../../../../interfaces/RollDice/RollDice";

export class StoneSoup extends Skill implements ISkill {
  private _character: IPlayerCharacter;

  constructor(game: IGame, character: IPlayerCharacter) {
    super(
      stoneSoup.name,
      stoneSoup.namePL,
      stoneSoup.description,
      stoneSoup.quote,
      [],
      null,
      3,
      game
    );
    this._character = character;
  }

  use(target: ICharacter | ActionDice | null = null) {
    if (this._game.phaseService.phase === "action") {
      this._game.resourceService.addBasicResourceToFuture(
        "food",
        1,
        this._namePL
      );
    } else {
      this._game.resourceService.addBasicResourceToOwned(
        "food",
        1,
        this._namePL
      );
    }
    this._used = true;
  }
}
