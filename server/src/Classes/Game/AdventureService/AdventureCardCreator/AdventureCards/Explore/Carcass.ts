import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_EXPLORE} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class Carcass extends ExploreAdventureCard implements IAdventureCard {


    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.CARCASS,
            "diarrhea",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
    }

    resolveOption2(resolver: IPlayerCharacter) {
        this._game.resourceService.addBasicResourceToFuture("food", 2, this._name);
        this._game.resourceService.addBasicResourceToFuture(
            "leather",
            1,
            this._name
        );
        this.shuffleIntoEventDeck();
    }


    triggerEventEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this._eventName);
    }
}
