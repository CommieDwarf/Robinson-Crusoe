import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_EXPLORE} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";

export class RuinedHut extends ExploreAdventureCard implements IAdventureCard {
    protected _eventNamePL = "niespokojne sny";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.RUINED_HUT,
            "zniszczona chatka",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    option1(resolver: IPlayerCharacter) {
    }

    option2(resolver: IPlayerCharacter) {
        //TODO: implement free invention build (knife, rope, shovel or medicine)
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._eventNamePL);
    }
}
