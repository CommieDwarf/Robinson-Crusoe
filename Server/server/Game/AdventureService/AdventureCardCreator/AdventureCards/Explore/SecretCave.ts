import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";

export class SecretCave extends ExploreAdventureCard implements IAdventureCard {
    protected _eventNamePL = "przebudzenie bestii";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.SECRET_CAVE,
            "tajemnicza jaskinia",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    option1(resolver: IPlayerCharacter) {
    }

    option2(resolver: IPlayerCharacter) {
        //TODO: implement option 1 creature and 2 treasures OR 1 trap and 2 treasures in the future.
        this.startDrawingMysteryCards(1, 0, 2, resolver);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //TODO: fight beast.
    }
}
