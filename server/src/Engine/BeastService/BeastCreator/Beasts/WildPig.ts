import {Beast} from "../Beast";
import {IBeast} from "../../../../types/Beasts/Beast";
import {IGame} from "../../../../types/Game";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class WildPig extends Beast implements IBeast {
  constructor(game: IGame) {
    super(
      "wild pig",
      "dzika świnia",
      3,
      1,
      new BasicResources(3, 0, 0, 1),
      game
    );
  }
}
