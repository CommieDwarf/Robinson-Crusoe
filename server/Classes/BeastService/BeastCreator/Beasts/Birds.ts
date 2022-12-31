import { Beast } from "../Beast";
import { IBeast } from "../../../../../interfaces/Beasts/Beast";
import { IGame } from "../../../../../interfaces/Game";
import { Resources } from "../../../ResourceService/Resources";

export class Birds extends Beast implements IBeast {
  constructor(game: IGame) {
    super("bear", 1, 0, new Resources(2, 0, 0, 0), game);
  }
}
