import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";
import {ICharacter} from "../../../../../../../interfaces/Characters/Character";

export class Backpack extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "backpack", "plecak", false, "", 0);
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.addCardAsReminder();
    }
}
