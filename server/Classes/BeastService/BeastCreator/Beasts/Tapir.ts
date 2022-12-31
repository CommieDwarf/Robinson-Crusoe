import { Beast } from "../Beast";
import { IBeast } from "../../../../../interfaces/Beasts/Beast";
import { IGame } from "../../../../../interfaces/Game";
import { Resources } from "../../../ResourceService/Resources";

export class Tapir extends Beast implements IBeast {
  constructor(game: IGame) {
    super("tapir", 3, 1, new Resources(2, 0, 0, 1), game);
  }
}
