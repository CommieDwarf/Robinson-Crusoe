import { Beast } from "../Beast";
import { IBeast } from "../../../../../interfaces/Beasts/Beast";
import { IGame } from "../../../../../interfaces/Game";
import { Resources } from "../../../ResourceService/Resources";

export class Boa extends Beast implements IBeast {
  constructor(game: IGame) {
    super("boa", 2, 2, new Resources(2, 0, 0, 0), game);
  }

  applySpecialEffect() {
    this._game.tokenService.addRandomTokenToOwned();
  }
}
