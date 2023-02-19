import { Beast } from "../Beast";
import { IBeast } from "../../../../../interfaces/Beasts/Beast";
import { IGame } from "../../../../../interfaces/Game";
import { Resources } from "../../../ResourceService/Resources";

export class Gorilla extends Beast implements IBeast {
  constructor(game: IGame) {
    super("gorilla", "goryl", 6, 3, new Resources(5, 0, 0, 2), game);
  }

  applySpecialEffect() {
    this._game.tokenService.addRandomTokenToOwned();
  }
}
