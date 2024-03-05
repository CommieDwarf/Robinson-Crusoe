import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

import {ACTION} from "../../../../../types/ACTION";

export class GoldCoin extends GatherAdventureCard implements IAdventureCard {
    protected _eventNamePL = "przeklęta moneta";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.GOLD_COIN,
            "złota moneta!",
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
        this._game.actionService.setReRollToken(ACTION.GATHER, true, this._eventNamePL);
        this._game.actionService.setReRollToken(ACTION.EXPLORE, true, this._eventNamePL);
        this._game.actionService.setReRollToken(ACTION.BUILD, true, this._eventNamePL);
    }
}
