import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class CeremonialBowl extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(
            game,
            "ceremonial bowl",
            "ceremonialna czara",
            true,
            "klątwa pokonana!",
            0
        );
    }

    triggerDrawEffect(drawer: IPlayerCharacter) {
        //TODO: implement reroll token on drawer.
    }

    triggerEventEffect() {
        //TODO: implement delete reroll token on drawer.
    }
}
