import { Beast } from "../Beast";
import { IBeast } from "../../../../../interfaces/Beasts/Beast";
import { IGame } from "../../../../../interfaces/Game";
import { Resources } from "../../../ResourceService/Resources";

export class Alligator extends Beast implements IBeast {
  constructor(game: IGame) {
    super("alligator", "aligator", 6, 2, new Resources(3, 0, 0, 0), game);
  }
}
