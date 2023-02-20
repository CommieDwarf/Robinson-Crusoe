import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_PERSONAL,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { Resources } from "../../../../ResourceService/Resources";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Fireplace extends Invention implements IInvention {
  protected _usable = true;
  protected readonly _namePL = "palenisko";

  constructor(game: IGame) {
    super(
      INVENTION_PERSONAL.FIREPLACE,
      { terrainType: null, inventions: [INVENTION_STARTER.FIRE] },
      INVENTION_TYPE.PERSONAL,
      new Resources(0, 0, 0, 1),
      game
    );
  }

  use(character: ICharacter) {
    const canAfford = this._game.resourceService.canAffordResource("food", 1);
    if (!canAfford) {
      this._game.alertService.setAlert(
        `${this._logSource}: nie masz wystarczająco jedzenia żeby użyć tej karty.`
      );
      return;
    }
    if (this._game.phaseService.phase !== "night") {
      this._game.alertService.setAlert(
        `${this._logSource}: Tej karty pomysłu można użyć tylko w nocy`
      );
      return;
    }

    if (this.used) {
      return;
    }

    this._game.resourceService.owned.spendResource("food", 1);
    this._game.characterService.heal(character, 2, this._logSource);
    this.used = true;
  }

  onNextRound() {
    this.used = false;
  }
}
