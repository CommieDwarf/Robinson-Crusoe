import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {TREASURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class Crocks extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, TREASURE_MYSTERY_CARD.CROCKS, false, "", 0);
    }

    triggerDrawEffect(drawer: ICharacter) {
        if (!this._game.inventionService.isBuilt(INVENTION_STARTER.POT)) {
            this._game.inventionService.build(INVENTION_STARTER.POT, drawer);
        }
    }
}
