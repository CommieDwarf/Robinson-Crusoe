import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

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

    resolveOption1(resolver: IPlayerCharacter) {
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //TODO: set beast dice to weather.
    }
}
