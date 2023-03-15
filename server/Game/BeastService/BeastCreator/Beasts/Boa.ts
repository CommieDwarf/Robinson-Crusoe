import { Beast } from "../Beast";
import { IBeast } from "../../../../../interfaces/Beasts/Beast";
import { IGame } from "../../../../../interfaces/Game";
import { BasicResources } from "../../../ResourceService/BasicResources";

export class Boa extends Beast implements IBeast {
  constructor(game: IGame) {
    super("boa", "boa", 2, 2, new BasicResources(2, 0, 0, 0), game);
  }

  applySpecialEffect() {
    this._game.tokenService.addRandomTokenToOwned();
  }
}
