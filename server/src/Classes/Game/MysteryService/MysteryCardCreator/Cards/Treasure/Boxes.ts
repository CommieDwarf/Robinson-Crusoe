import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Boxes extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "boxes", "skrzynie", false, "", 0);
    }


    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }
}
