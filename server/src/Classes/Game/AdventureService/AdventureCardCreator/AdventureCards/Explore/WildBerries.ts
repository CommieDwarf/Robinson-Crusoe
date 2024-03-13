import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_EXPLORE} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class WildBerries
    extends ExploreAdventureCard
    implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.WILD_BERRIES,
            "indigestion",
            false,
            game,
            "shuffle",
            ""
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        //TODO: put wound.
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //TODO: implement.
    }
}
