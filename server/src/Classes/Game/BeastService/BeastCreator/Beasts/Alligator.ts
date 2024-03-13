import {Beast} from "../Beast";
import {BEAST, IBeast} from "@shared/types/Game/Beasts/Beast";
import {IGame} from "@shared/types/Game/Game";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class Alligator extends Beast implements IBeast {
    constructor(game: IGame) {
        super(BEAST.ALLIGATOR, 6, 2, new BasicResources(3, 0, 0, 0), game);
    }
}
