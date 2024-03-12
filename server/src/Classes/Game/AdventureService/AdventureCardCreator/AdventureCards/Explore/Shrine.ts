import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {ADVENTURE_CARD_EXPLORE} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

import {ACTION} from "@shared/types/Game/ACTION";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";

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

    resolveOption1(resolver: IPlayerCharacter) {
    }

    resolveOption2(resolver: IPlayerCharacter) {
        this.startDrawingMysteryCards(0, 0, 1, resolver);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.actionService.setReRollToken(ACTION.EXPLORE, true, this._eventNamePL);
        this._game.actionService.setReRollToken(ACTION.GATHER, true, this._eventNamePL);
        this._game.actionService.setReRollToken(ACTION.BUILD, true, this._eventNamePL);
    }
}
