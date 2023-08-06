import { Skill } from "../Skill/Skill";
import { IGame } from "../../../../../../interfaces/Game";
import { grandmasRecipe } from "../../../../../../constants/SkillDescriptions/Cook";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/PlayerCharacter";
import { ISkill } from "../../../../../../interfaces/Skill/Skill";
import { ActionDice } from "../../../../../../interfaces/RollDice/RollDice";

export class GrandmasRecipe extends Skill implements ISkill {
  private _character: IPlayerCharacter;

  constructor(game: IGame, character: IPlayerCharacter) {
    super(
      grandmasRecipe.name,
      grandmasRecipe.namePL,
      grandmasRecipe.description,
      grandmasRecipe.quote,
      [],
      null,
      2,
      game
    );
    this._character = character;
  }

  use(target: IPlayerCharacter | ActionDice | null = null) {
    if (!target) {
      return;
    }
    if (this._game.resourceService.canAffordResource("food", 1)) {
      this._character.decrDetermination(this.cost);
      this._game.characterService.heal(target, 2, this._namePL);
      this._game.resourceService.spendBasicResourceIfPossible("food", 1, "");
      this._used = true;
    } else {
      this._game.alertService.setAlert(
        "Niewystarczająco jedzenia aby użyć tej umiejętności"
      );
    }
  }
}
