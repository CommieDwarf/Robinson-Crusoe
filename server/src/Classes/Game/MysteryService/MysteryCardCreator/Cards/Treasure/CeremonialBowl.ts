import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {TREASURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class CeremonialBowl extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(
            game,
            TREASURE_MYSTERY_CARD.CEREMONIAL_BOWL,
            "ceremonialna czara",
            true,
            "klątwa pokonana!",
            0
        );
    }

    triggerDrawEffect(drawer: ICharacter) {
        //TODO: implement reroll token on drawer.
    }

    triggerEventEffect() {
        //TODO: implement delete reroll token on drawer.
    }
}
