import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../types/Game";
import {INVENTION_STARTER} from "../../../../../types/InventionService/Invention";
import {ICharacter} from "../../../../../types/Characters/Character";

export class Crocks extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "crocks", "gliniane naczynia", false, "", 0);
    }

    triggerDrawEffect(drawer: ICharacter) {
        if (!this._game.inventionService.isBuilt(INVENTION_STARTER.POT)) {
            this._game.inventionService.build(INVENTION_STARTER.POT, drawer);
        }
    }
}
