import { Beast } from "../Beast";
import { IBeast } from "../../../../../interfaces/Beasts/Beast";
import { IGame } from "../../../../../interfaces/Game";
import { Resources } from "../../../ResourceService/Resources";

export class Tiger extends Beast implements IBeast {
  constructor(game: IGame) {
    super("tiger", 6, 2, new Resources(5, 0, 0, 2), game);
  }
}
