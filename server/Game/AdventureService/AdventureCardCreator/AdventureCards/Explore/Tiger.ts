import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class Tiger extends ExploreAdventureCard implements IAdventureCard {
    protected _eventNamePL = "tygrys was odnajduje";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.TIGER,
            "tygrys!",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    option1(resolver: IPlayerCharacter) {
        //TODO: night out of camp.
    }

    option2(resolver: IPlayerCharacter) {
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //TODO: JUMP, JUMP
        //TODO: JUMP ON THE TIGER
    }
}
