import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class OldClothes extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "old clothes", "komplet starych ubrań", false, "", 0);
    }

    triggerDrawEffect(drawer: IPlayerCharacter) {
        this.addToResources();
    }
}
