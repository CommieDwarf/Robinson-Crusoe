import { Beast } from "../Beast";
import { IBeast } from "../../../../../interfaces/Beasts/Beast";
import { IGame } from "../../../../../interfaces/Game";
import { BasicResources } from "../../../ResourceService/BasicResources";

export class Alligator extends Beast implements IBeast {
  constructor(game: IGame) {
    super("alligator", "aligator", 6, 2, new BasicResources(3, 0, 0, 0), game);
  }
}
