import { Beast } from "../Beast";
import { IBeast } from "../../../../../interfaces/Beasts/Beast";
import { IGame } from "../../../../../interfaces/Game";
import { BasicResources } from "../../../ResourceService/BasicResources";

export class Birds extends Beast implements IBeast {
  constructor(game: IGame) {
    super("bear", "ptaki", 1, 0, new BasicResources(2, 0, 0, 0), game);
  }
}
