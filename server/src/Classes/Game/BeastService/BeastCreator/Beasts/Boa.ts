import {Beast} from "../Beast";
import {IBeast} from "@shared/types/Game/Beasts/Beast";
import {IGame} from "@shared/types/Game/Game";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class Boa extends Beast implements IBeast {
    constructor(game: IGame) {
        super("boa", "boa", 2, 2, new BasicResources(2, 0, 0, 0), game);
    }

    applySpecialEffect() {
        this._game.tokenService.addRandomTokensToOwned(1);
    }
}
