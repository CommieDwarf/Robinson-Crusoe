import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";
import {ACTION} from "../../../../../../interfaces/ACTION";

export class Shrine extends ExploreAdventureCard implements IAdventureCard {
    protected _eventNamePL = "koszmary";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.SHRINE,
            "kapliczka",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    option1(resolver: ICharacter) {
    }

    option2(resolver: ICharacter) {
        this.startDrawingMysteryCards(0, 0, 1, resolver);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.actionService.setReRollToken(ACTION.EXPLORE, true, this._eventNamePL);
    }
}
