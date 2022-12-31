import { IGame } from "../../../../../interfaces/Game";
import { Beast } from "../Beast";
import { IBeast } from "../../../../../interfaces/Beasts/Beast";
import { Resources } from "../../../ResourceService/Resources";

export class Goats extends Beast implements IBeast {
  constructor(game: IGame) {
    super("goats", 4, 1, new Resources(3, 0, 0, 1), game);
  }
}
