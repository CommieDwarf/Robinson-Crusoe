import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_EXPLORE} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class StormOnTheHorizon
    extends ExploreAdventureCard
    implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.STORM_ON_THE_HORIZON,
            "storm",
            false,
            game,
            "shuffle",
            ""
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.weatherService.setToken("storm", true, this._eventName);
    }
}
