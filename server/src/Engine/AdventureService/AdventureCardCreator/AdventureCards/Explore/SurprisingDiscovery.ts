import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class SurprisingDiscovery
    extends ExploreAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.SURPRISING_DISCOVERY,
            "zaskakujące znalezisko",
            false,
            game,
            "keep",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        //TODO: keep card with temporary +3 weapon usage.
    }
}
