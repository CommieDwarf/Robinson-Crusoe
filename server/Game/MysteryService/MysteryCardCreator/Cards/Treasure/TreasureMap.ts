import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../../interfaces/Game";

export class TreasureMap extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "treasure Map", "mapa skarbów", false, "", 1);
    }

    use(): void {
        //todo: implement
    }
}
