import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class RemainsOfASettlement extends ExploreAdventureCard implements IAdventureCard {
    protected _eventNamePL = "epidemia";

    constructor(game: IGame) {
        super(ADVENTURE_CARD_EXPLORE.REMAINS_OF_A_SETTLEMENT, "pozostałości osady", true, game);
    }

    option1() {
    }

    option2() {
        //TODO: implement mystery cards
        this.shuffleIntoEventDeck();
    }

    eventEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this._eventNamePL)
    }
}