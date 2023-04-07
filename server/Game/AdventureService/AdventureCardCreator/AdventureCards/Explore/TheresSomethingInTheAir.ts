import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";
import {ACTION} from "../../../../../../interfaces/ACTION";

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

    option1(resolver: ICharacter) {
        this._game.actionService.setAdventureToken(ACTION.EXPLORE, true, this._namePL);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.actionService.setAdventureToken(ACTION.EXPLORE, true, this._namePL);
    }
}
