import { Beast } from "../Beast";
import { IBeast } from "../../../../../interfaces/Beasts/Beast";
import { IGame } from "../../../../../interfaces/Game";
import { Resources } from "../../../ResourceService/Resources";

export class Iguana extends Beast implements IBeast {
  constructor(game: IGame) {
    super("iguana", 4, 1, new Resources(3, 0, 0, 1), game);
  }

  applySpecialEffect() {
    this.getLeader().hurt(1);
  }
}
