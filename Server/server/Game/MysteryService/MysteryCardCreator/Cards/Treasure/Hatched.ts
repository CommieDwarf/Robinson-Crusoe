import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";
import {ICharacter} from "../../../../../../../interfaces/Characters/Character";

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
