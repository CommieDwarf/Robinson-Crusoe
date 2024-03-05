import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";

export class ColdWind extends ExploreAdventureCard implements IAdventureCard {
    protected _eventNamePL = "Śnieg";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.COLD_WIND,
            "zimny wiatr",
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
        this._game.weatherService.setToken("snow", true, this._eventNamePL);
    }
}
