import { Beast } from "../Beast";
import { IBeast } from "../../../../../interfaces/Beasts/Beast";
import { IGame } from "../../../../../interfaces/Game";
import { Resources } from "../../../ResourceService/Resources";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";

export class Jaguar extends Beast implements IBeast {
  constructor(game: IGame) {
    super("jaguar", "jaguar", 5, 0, new Resources(4, 0, 0, 1), game);
  }

  applySpecialEffect() {
    if (
      !this._game.inventionService.getInvention(INVENTION_STARTER.MEDICINE)
        .isBuilt
    ) {
      this.getLeader().hurt(2);
    }
  }
}
