import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class FearOfTheBeasts
    extends BuildAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "kosztowna ochrona";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.FEAR_OF_THE_BEASTS,
            "strach przed bestiami",
            false,
            game,
            "shuffle",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //todo: implement const increment for constructions.
      
    }
}
