import {Beast} from "../Beast";
import {IBeast} from "@shared/types/Game/Beasts/Beast";
import {IGame} from "@shared/types/Game/Game";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class Chamois extends Beast implements IBeast {
    constructor(game: IGame) {
        super("chamois", "kozica", 5, 1, new BasicResources(3, 0, 0, 2), game);
    }
}
