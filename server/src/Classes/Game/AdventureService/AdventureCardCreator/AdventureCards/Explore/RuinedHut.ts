import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_EXPLORE} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";

export class RuinedHut extends ExploreAdventureCard implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.RUINED_HUT,
            "restless dreams",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
    }

    resolveOption2(resolver: IPlayerCharacter) {
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._eventName);
    }
}
