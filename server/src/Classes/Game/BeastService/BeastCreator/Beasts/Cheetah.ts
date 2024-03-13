import {Beast} from "../Beast";
import {BEAST, IBeast} from "@shared/types/Game/Beasts/Beast";
import {IGame} from "@shared/types/Game/Game";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class Cheetah extends Beast implements IBeast {
    constructor(game: IGame) {
        super(BEAST.CHEETAH, 4, 1, new BasicResources(2, 0, 0, 1), game);
    }
}
