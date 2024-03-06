import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Backpack extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "backpack", "plecak", false, "", 0);
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.addCardAsReminder();
    }
}
