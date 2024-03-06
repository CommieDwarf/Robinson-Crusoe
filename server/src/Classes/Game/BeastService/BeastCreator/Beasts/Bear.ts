import {Beast} from "../Beast";
import {IBeast} from "@shared/types/Game/Beasts/Beast";
import {IGame} from "@shared/types/Game/Game";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class Bear extends Beast implements IBeast {
    constructor(game: IGame) {
        super("bear", "niedźwiedź", 6, 1, new BasicResources(5, 0, 0, 2), game);
    }
}
