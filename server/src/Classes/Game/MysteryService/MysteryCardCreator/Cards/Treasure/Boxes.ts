import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {TREASURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class Boxes extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, TREASURE_MYSTERY_CARD.BOXES, false, "", 0);
    }


    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }
}
