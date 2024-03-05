import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";


export class EyesInTheBushes
    extends GatherAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "niespodziewana wizyta";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.EYES_IN_THE_BUSHES,
            "oczy w ciemności",
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
        //TODO: set hungry animal in weather.
        // this._game.weatherService.setToken()
    }
}
