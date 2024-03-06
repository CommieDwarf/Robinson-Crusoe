import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_EXPLORE} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

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
