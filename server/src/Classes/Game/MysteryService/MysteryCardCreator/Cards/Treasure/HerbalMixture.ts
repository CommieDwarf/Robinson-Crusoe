import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class HerbalMixture extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "herbal mixture", "ziołowa mikstura", false, "", 1);
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }

    use() {
        //TODO: implement
    }
}
