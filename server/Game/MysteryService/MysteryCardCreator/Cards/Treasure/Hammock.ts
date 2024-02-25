import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class Hammock extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "hammock", "hamak", false, "", 0);
    }

    triggerDrawEffect(drawer: IPlayerCharacter) {
        this.addToResources();
    }
}
