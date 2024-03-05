import {Beast} from "../Beast";
import {IBeast} from "../../../../types/Beasts/Beast";
import {IGame} from "../../../../types/Game";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class Gorilla extends Beast implements IBeast {
    constructor(game: IGame) {
        super("gorilla", "goryl", 6, 3, new BasicResources(5, 0, 0, 2), game);
    }

    applySpecialEffect() {
        this._game.tokenService.addRandomTokensToOwned(1);
    }
}
