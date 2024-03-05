import {Beast} from "../Beast";
import {IBeast} from "../../../../types/Beasts/Beast";
import {IGame} from "../../../../types/Game";
import {BasicResources} from "../../../ResourceService/BasicResources";
import {INVENTION_STARTER} from "../../../../types/InventionService/Invention";

export class Jaguar extends Beast implements IBeast {
  constructor(game: IGame) {
    super("jaguar", "jaguar", 5, 0, new BasicResources(4, 0, 0, 1), game);
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
