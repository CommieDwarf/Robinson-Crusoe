import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_EXPLORE} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";

export class Bamboo extends ExploreAdventureCard implements IAdventureCard {


    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.BAMBOO,
            "bambus",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
    }

    resolveOption2(resolver: IPlayerCharacter) {
        this._game.resourceService.addBasicResourceToOwned("wood", 2, this._name);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
    }
}
