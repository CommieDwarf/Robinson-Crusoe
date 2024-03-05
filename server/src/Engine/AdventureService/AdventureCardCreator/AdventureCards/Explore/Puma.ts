import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

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

    option1(resolver: IPlayerCharacter) {
        //TODO: implement night out of camp.
    }

    option2(resolver: IPlayerCharacter) {
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //TODO: fight puma
    }
}
