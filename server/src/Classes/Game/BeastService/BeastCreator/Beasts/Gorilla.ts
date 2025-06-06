import {Beast} from "../Beast";
import {BEAST, IBeast} from "@shared/types/Game/Beasts/Beast";
import {IGame} from "@shared/types/Game/Game";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class Gorilla extends Beast implements IBeast {
    constructor(game: IGame) {
        super(BEAST.GORILLA, 6, 3, new BasicResources(5, 0, 0, 2), game);
    }

    applySpecialEffect() {
        this._game.tokenService.addRandomTokensToOwned(1);
    }
}
