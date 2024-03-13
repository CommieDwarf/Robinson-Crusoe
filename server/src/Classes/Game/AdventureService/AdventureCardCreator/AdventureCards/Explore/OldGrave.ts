import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_EXPLORE} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class OldGrave extends ExploreAdventureCard implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.OLD_GRAVE,
            "memories of the dead castaway",
            false,
            game,
            "shuffle",
            ""
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        this._game.characterService.decrDeterminationOrGetHurt(resolver, 1, this._name);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        const character = this.getPrimeCharacter();
        this._game.characterService.decrDeterminationOrGetHurt(
            character,
            2,
            this._eventName
        );
    }
}
