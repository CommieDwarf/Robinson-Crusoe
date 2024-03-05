import { Beast } from "../Beast";
import { IBeast } from "../../../../../../interfaces/Beasts/Beast";
import { IGame } from "../../../../../../interfaces/Game";
import { BasicResources } from "../../../ResourceService/BasicResources";

export class Iguana extends Beast implements IBeast {
  constructor(game: IGame) {
    super("iguana", "legwan", 4, 1, new BasicResources(3, 0, 0, 1), game);
  }

  applySpecialEffect() {
    this.getLeader().hurt(1);
  }
}
