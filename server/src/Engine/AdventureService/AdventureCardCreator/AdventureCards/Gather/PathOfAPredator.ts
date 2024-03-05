import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class PathOfAPredator
    extends GatherAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "atak bestii";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.PATH_OF_A_PREDATOR,
            "ścieżka drapieżnika",
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
        //TODO: set beast dice to weather.
    }
}
