import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class Puma extends ExploreAdventureCard implements IAdventureCard {
    protected _eventNamePL = "atak pumy!";

    constructor(game: IGame) {
        super(ADVENTURE_CARD_EXPLORE.PUMA, "puma!", true, game);
    }

    option1() {
        //TODO: implement night out of camp.
    }

    option2() {
        this.shuffleIntoEventDeck();
    }

    eventEffect() {
        //TODO: fight puma
    }
}