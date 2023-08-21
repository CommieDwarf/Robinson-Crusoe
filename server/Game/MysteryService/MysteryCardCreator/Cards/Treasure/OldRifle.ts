import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {CONSTRUCTION} from "../../../../../../interfaces/ConstructionService/Construction";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class OldRifle extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "old rifle", "stara strzelba", false, "", 1);
    }

    use(): void {
        this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON).incrTemporaryBoost(3);
        this.removeFromOwnedResources();
    }

    triggerDrawEffect(drawer: IPlayerCharacter) {
        this.addToResources();
    }
}
