import { Beast } from "../Beast";
import { IBeast } from "../../../../../interfaces/Beasts/Beast";
import { IGame } from "../../../../../interfaces/Game";
import { BasicResources } from "../../../ResourceService/BasicResources";

export class Gorilla extends Beast implements IBeast {
  constructor(game: IGame) {
    super("gorilla", "goryl", 6, 3, new BasicResources(5, 0, 0, 2), game);
  }

  applySpecialEffect() {
    this._game.tokenService.addRandomTokenToOwned();
  }
}
