import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class OldRifle extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "old rifle", "stara strzelba", false, "", 1);
    }

    use(): void {
        this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON).incrTemporaryBoost(3);
        this.removeFromOwnedResources();
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }
}
