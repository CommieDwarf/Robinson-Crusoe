import { Beast } from "../Beast";
import { IBeast } from "../../../../../interfaces/Beasts/Beast";
import { IGame } from "../../../../../interfaces/Game";
import { Resources } from "../../../ResourceService/Resources";

export class WildPig extends Beast implements IBeast {
  constructor(game: IGame) {
    super("wild pig", "dzika świnia", 3, 1, new Resources(3, 0, 0, 1), game);
  }
}
