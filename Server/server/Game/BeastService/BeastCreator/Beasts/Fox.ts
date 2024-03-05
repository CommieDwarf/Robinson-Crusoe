import { Beast } from "../Beast";
import { IBeast } from "../../../../../../interfaces/Beasts/Beast";
import { IGame } from "../../../../../../interfaces/Game";
import { BasicResources } from "../../../ResourceService/BasicResources";

export class Fox extends Beast implements IBeast {
  constructor(game: IGame) {
    super("fox", "lis", 2, 0, new BasicResources(2, 0, 0, 1), game);
  }
}
