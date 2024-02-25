import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class CaveWithFurs extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "cave with furs", "grota ze skórami", false, "", 1);
    }

    triggerDrawEffect(drawer: IPlayerCharacter) {
        this._game.resourceService.addBasicResourceToFuture(
            "leather",
            2,
            this._namePL
        );
    }
}
