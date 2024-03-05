import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class ThornyBush extends ExploreAdventureCard implements IAdventureCard {
    protected _eventNamePL = "spuchnięte ramię";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.THORNY_BUSH,
            "kolczasty krzew",
            false,
            game,
            "shuffle",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        //TODO: implement wound
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //TODO: implement
    }
}
