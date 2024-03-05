import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

import {ACTION} from "../../../../../types/ACTION";

export class TheresSomethingInTheAir
    extends ExploreAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "przeklęta wyspa";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.THERES_SOMETHING_IN_THE_AIR,
            "coś się szykuje",
            false,
            game,
            "shuffle",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        this._game.actionService.setAdventureToken(ACTION.EXPLORE, true, this._namePL);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.actionService.setAdventureToken(ACTION.EXPLORE, true, this._namePL);
    }
}
