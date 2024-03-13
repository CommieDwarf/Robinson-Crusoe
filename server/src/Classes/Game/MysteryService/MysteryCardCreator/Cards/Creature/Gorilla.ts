import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {CREATURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class Gorilla
    extends CreatureMysteryCard {
    constructor(game: IGame) {
        super(game, CREATURE_MYSTERY_CARD.GORILLA, true, "gorilla in the camp");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.characterService.hurt(drawer, 2, this._name);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.constructionService.lvlDownOrGetHurt(
            CONSTRUCTION.WEAPON,
            2,
            this._name
        );
    }
}
