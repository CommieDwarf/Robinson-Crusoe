import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_BUILD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class HowlingInTheBushes
    extends BuildAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "bestia jest tutaj!";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.HOWLING_IN_THE_BUSHES,
            "wycie w buszu",
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
        //todo: implement fighting beast by prime player
    }
}
