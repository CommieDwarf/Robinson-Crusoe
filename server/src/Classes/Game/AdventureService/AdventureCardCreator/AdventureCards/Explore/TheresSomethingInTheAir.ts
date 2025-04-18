import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_EXPLORE} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

import {ACTION} from "@shared/types/Game/ACTION";

export class TheresSomethingInTheAir
    extends ExploreAdventureCard
    implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.THERES_SOMETHING_IN_THE_AIR,
            "cursed island",
            false,
            game,
            "shuffle",
            ""
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        this._game.actionService.setAdventureToken(ACTION.EXPLORE, true, this._name);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.actionService.setAdventureToken(ACTION.EXPLORE, true, this._name);
    }
}
