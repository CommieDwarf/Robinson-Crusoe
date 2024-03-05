import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class StormOnTheHorizon
    extends ExploreAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "sztorm";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.STORM_ON_THE_HORIZON,
            "nadciąga sztorm",
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
        this._game.weatherService.setToken("storm", true, this._eventNamePL);
    }
}
