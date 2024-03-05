import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../types/Game";
import {ICharacter} from "../../../../../types/Characters/Character";

export class Helmet extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "helmet", "hełm", false, "", 0);
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }
}
