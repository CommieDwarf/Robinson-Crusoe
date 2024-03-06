import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Sabre extends TreasureMysteryCard {

    private usedInRound = 0;

    constructor(game: IGame) {
        super(game, "sabre", "szabla", false, "", 1);
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }

    use(): void {
        if (this.usedInRound !== this._game.round && this._game.actionService.action === "hunt") {
            this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON).incrTemporaryBoost(3);
            this._game.characterService.hurt(this._game.localPlayer.getCharacter(), 1, this._namePL);
            this.usedInRound = this._game.round;

        }
    }
}
