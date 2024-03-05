import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class Flu extends ExploreAdventureCard implements IAdventureCard {
    protected _eventNamePL = "ból gardła";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.FLU,
            "grypa",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    option1(resolver: IPlayerCharacter) {
        this._game.resourceService.spendBasicResourceOrGetHurt(
            "food",
            1,
            this._namePL
        );
    }

    option2(resolver: IPlayerCharacter) {
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //TODO: implement double food consumption or get hurt.
    }
}
