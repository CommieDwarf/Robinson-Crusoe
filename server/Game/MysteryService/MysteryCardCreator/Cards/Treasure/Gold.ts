import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class Gold extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "gold", "złoto!", false, "", 0);
    }

    triggerDrawEffect(drawer: IPlayerCharacter) {
        this.addToResources();
    }
}
