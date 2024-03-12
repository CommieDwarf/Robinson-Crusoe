import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_EXPLORE} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class Puma extends ExploreAdventureCard implements IAdventureCard {
    protected _eventNamePL = "atak pumy!";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.PUMA,
            "puma!",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        //TODO: implement night out of camp.
    }

    resolveOption2(resolver: IPlayerCharacter) {
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //TODO: fight puma
    }
}
