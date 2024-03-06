import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Hatched extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "hatched", "siekiera", false, "", 1);
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }

    use() {
        this._game.tileService.campTile.addModifierByResource("wood", this.namePL);
        this.removeFromOwnedResources();
    }
}
