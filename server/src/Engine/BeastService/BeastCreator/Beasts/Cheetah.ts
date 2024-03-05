import {Beast} from "../Beast";
import {IBeast} from "../../../../types/Beasts/Beast";
import {IGame} from "../../../../types/Game";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class Cheetah extends Beast implements IBeast {
  constructor(game: IGame) {
    super("cheetah", "gepard", 4, 1, new BasicResources(2, 0, 0, 1), game);
  }
}
