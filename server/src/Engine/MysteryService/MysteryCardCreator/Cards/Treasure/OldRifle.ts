import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../types/Game";
import {CONSTRUCTION} from "../../../../../types/ConstructionService/Construction";
import {ICharacter} from "../../../../../types/Characters/Character";

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
