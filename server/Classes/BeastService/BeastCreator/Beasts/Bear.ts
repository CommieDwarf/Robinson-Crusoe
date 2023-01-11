import { Beast } from "../Beast";
import { IBeast } from "../../../../../interfaces/Beasts/Beast";
import { IGame } from "../../../../../interfaces/Game";
import { Resources } from "../../../ResourceService/Resources";

export class Bear extends Beast implements IBeast {
  constructor(game: IGame) {
    super("bear", "niedzwiedź", 6, 1, new Resources(5, 0, 0, 2), game);
  }
}
