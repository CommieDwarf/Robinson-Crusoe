import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class WildBerries
    extends ExploreAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "niestrawność";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.WILD_BERRIES,
            "dzikie jagody",
            false,
            game,
            "shuffle",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        //TODO: put wound.
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //TODO: implement.
    }
}
