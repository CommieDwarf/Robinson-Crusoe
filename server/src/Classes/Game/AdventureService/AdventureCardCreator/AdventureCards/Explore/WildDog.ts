import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_EXPLORE} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class WildDog extends ExploreAdventureCard implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.WILD_DOG,
            "old buddy",
            false,
            game,
            "shuffle",
            ""
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        const character = this.getPrimeCharacter();
        this._game.characterService.hurt(character, 1, this._name);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
    }
}
