import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";

export class WinterIsComing
    extends GatherAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "przymrozek";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.WINTER_IS_COMING,
            "nadchodzi zima",
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
        this._game.weatherService.setToken("snow", true, this._eventNamePL);
    }
}
