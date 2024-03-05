import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class YouNeedABiggerCamp
    extends BuildAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "rozbudowa obozowiska";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.YOU_NEED_A_BIGGER_CAMP,
            "potrzeba zmian",
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
        //TODO: implement +1 wood consumption on every construction
    }
}
