import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {TREASURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";

export class Sabre extends TreasureMysteryCard {

    private usedInRound = 0;

    constructor(game: IGame) {
        super(game, TREASURE_MYSTERY_CARD.SABRE, false, "", 1);
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }

    use(player: IPlayer): void {
        if (this.usedInRound !== this._game.round && this._game.actionService.action === "hunt") {
            this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON).incrTemporaryBoost(3);
            this._game.characterService.hurt(player.getCharacter(), 1, this._name);
            this.usedInRound = this._game.round;

        }
    }
}
