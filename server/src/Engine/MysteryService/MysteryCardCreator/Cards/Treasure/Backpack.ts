import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../types/Game";
import {ICharacter} from "../../../../../types/Characters/Character";

export class Backpack extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "backpack", "plecak", false, "", 0);
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.addCardAsReminder();
    }
}
