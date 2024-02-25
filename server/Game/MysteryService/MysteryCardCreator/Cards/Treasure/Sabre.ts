import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";
import {CONSTRUCTION} from "../../../../../../interfaces/ConstructionService/Construction";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";

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
