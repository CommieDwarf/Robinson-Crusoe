import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

import {ACTION} from "@shared/types/Game/ACTION";

export class GoldCoin extends GatherAdventureCard implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.GOLD_COIN,
            "cursed coin",
            false,
            game,
            "shuffle",
            ""
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.actionService.setReRollToken(ACTION.GATHER, true, this._eventName);
        this._game.actionService.setReRollToken(ACTION.EXPLORE, true, this._eventName);
        this._game.actionService.setReRollToken(ACTION.BUILD, true, this._eventName);
    }
}
