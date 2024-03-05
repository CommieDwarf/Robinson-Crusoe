import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class EmptyForest
    extends ExploreAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "głodne drapieżniki";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.EMPTY_FOREST,
            "pusty las",
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
        //TODO: implement token at hunt which makes beast stronger.
    }
}
