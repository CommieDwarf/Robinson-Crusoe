import {Beast} from "../Beast";
import {IBeast} from "@shared/types/Game/Beasts/Beast";
import {IGame} from "@shared/types/Game/Game";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class Tapir extends Beast implements IBeast {
    constructor(game: IGame) {
        super("tapir", "tapir", 3, 1, new BasicResources(2, 0, 0, 1), game);
    }
}
