import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";
import {ICharacter} from "../../../../../../../interfaces/Characters/Character";

export class OldClothes extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "old clothes", "komplet starych ubrań", false, "", 0);
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }
}
