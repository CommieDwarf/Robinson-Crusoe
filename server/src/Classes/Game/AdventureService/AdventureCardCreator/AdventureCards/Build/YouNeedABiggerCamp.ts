import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_BUILD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class YouNeedABiggerCamp
    extends BuildAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "rozbudowa obozowiska";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.YOU_NEED_A_BIGGER_CAMP,
            "potrzeba zmian",
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
        //TODO: implement +1 wood consumption on every construction
    }
}
