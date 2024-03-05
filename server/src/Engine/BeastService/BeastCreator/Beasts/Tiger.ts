import {Beast} from "../Beast";
import {IBeast} from "../../../../types/Beasts/Beast";
import {IGame} from "../../../../types/Game";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class Tiger extends Beast implements IBeast {
  constructor(game: IGame) {
    super("tiger", "tygrys", 6, 2, new BasicResources(5, 0, 0, 2), game);
  }
}
