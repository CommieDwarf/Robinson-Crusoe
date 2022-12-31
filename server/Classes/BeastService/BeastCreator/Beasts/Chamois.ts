import { Beast } from "../Beast";
import { IBeast } from "../../../../../interfaces/Beasts/Beast";
import { IGame } from "../../../../../interfaces/Game";
import { Resources } from "../../../ResourceService/Resources";

export class Chamois extends Beast implements IBeast {
  constructor(game: IGame) {
    super("chamois", 5, 1, new Resources(3, 0, 0, 2), game);
  }
}
