import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {CREATURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class UnleashedBeast
    extends CreatureMysteryCard {
    constructor(game: IGame) {
        super(game, CREATURE_MYSTERY_CARD.UNLEASHED_BEAST, false, "");
    }

    triggerDrawEffect(drawer: ICharacter) {
        if (this._game.beastService.deckCount > 0) {
            this._game.beastService.removeBeastFromDeck();
        }
    }
}
