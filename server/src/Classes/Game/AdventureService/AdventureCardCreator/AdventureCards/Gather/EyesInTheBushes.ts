import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";


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

    resolveOption1(resolver: IPlayerCharacter) {
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //TODO: set hungry animal in weather.
        // this._game.weatherService.setToken()
    }
}
