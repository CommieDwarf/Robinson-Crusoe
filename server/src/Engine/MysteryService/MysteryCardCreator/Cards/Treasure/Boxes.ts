import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../types/Game";
import {ICharacter} from "../../../../../types/Characters/Character";

export class Boxes extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "boxes", "skrzynie", false, "", 0);
    }


    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }
}
