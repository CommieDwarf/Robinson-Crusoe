import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_EXPLORE} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class LostInTheThicket
    extends ExploreAdventureCard
    implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.LOST_IN_THE_THICKET,
            "",
            false,
            game,
            "discard",
            ""
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        //TODO: implement camp out of camp and pull discovery token just before event Phase
    }
}
