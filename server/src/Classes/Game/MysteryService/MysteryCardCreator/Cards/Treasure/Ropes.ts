import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Ropes extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "ropes", "liny", false, "", 0);
    }

    triggerDrawEffect(drawer: ICharacter) {
    }
}
