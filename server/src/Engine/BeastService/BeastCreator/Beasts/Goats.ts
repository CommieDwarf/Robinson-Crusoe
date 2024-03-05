import {IGame} from "../../../../types/Game";
import {Beast} from "../Beast";
import {IBeast} from "../../../../types/Beasts/Beast";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class Goats extends Beast implements IBeast {
  constructor(game: IGame) {
    super("goats", "kozły", 4, 1, new BasicResources(3, 0, 0, 1), game);
  }
}
