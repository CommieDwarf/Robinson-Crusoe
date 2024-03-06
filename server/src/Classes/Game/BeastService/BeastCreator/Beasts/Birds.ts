import {Beast} from "../Beast";
import {IBeast} from "@shared/types/Game/Beasts/Beast";
import {IGame} from "@shared/types/Game/Game";
import {BasicResources} from "../../../ResourceService/BasicResources";

export class Birds extends Beast implements IBeast {
    constructor(game: IGame) {
        super("bear", "ptaki", 1, 0, new BasicResources(2, 0, 0, 0), game);
    }
}
