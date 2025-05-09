import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {TREASURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";

export class BottleOfWine extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, TREASURE_MYSTERY_CARD.BOTTLE_OF_WINE, false, "", 1);
    }

    use(player: IPlayer): void {
        super.use();
        this._game.characterService.heal(player.getCharacter(), 2, this._name);
        this.removeFromOwnedResources();
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }
}
