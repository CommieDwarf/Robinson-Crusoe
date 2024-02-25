import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class HerbalMixture extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "herbal mixture", "ziołowa mikstura", false, "", 1);
    }

    triggerDrawEffect(drawer: IPlayerCharacter) {
        this.addToResources();
    }

    use() {
        //TODO: implement
    }
}
