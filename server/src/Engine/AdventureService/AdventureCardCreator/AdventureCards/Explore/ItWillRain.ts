import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class ItWillRain extends ExploreAdventureCard implements IAdventureCard {
    protected _eventNamePL = "oberwane chmury";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.IT_WILL_RAIN,
            "niebo zaciąga się",
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
        this._game.weatherService.setToken("rain", true, this._eventNamePL);
    }
}
