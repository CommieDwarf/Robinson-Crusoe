import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class Helmet extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "helmet", "hełm", false, "", 0);
    }

    triggerDrawEffect(drawer: IPlayerCharacter) {
        this.addToResources();
    }
}
