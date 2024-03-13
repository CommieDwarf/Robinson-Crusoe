import {IGame} from "@shared/types/Game/Game";
import {Beast} from "../Beast";
import {BEAST, IBeast} from "@shared/types/Game/Beasts/Beast";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class Goats extends Beast implements IBeast {
    constructor(game: IGame) {
        super(BEAST.GOATS, 4, 1, new BasicResources(3, 0, 0, 1), game);
    }
}
