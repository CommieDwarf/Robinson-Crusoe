import {Beast} from "../Beast";
import {BEAST, IBeast} from "@shared/types/Game/Beasts/Beast";
import {IGame} from "@shared/types/Game/Game";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class Bear extends Beast implements IBeast {
    constructor(game: IGame) {
        super(BEAST.BEAR, 6, 1, new BasicResources(5, 0, 0, 2), game);
    }
}
