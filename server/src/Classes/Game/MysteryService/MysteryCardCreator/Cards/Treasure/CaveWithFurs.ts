import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {TREASURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class CaveWithFurs extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, TREASURE_MYSTERY_CARD.CAVE_WITH_FURS, false, "", 1);
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.resourceService.addBasicResourceToFuture(
            "leather",
            2,
            this._name
        );
    }
}
