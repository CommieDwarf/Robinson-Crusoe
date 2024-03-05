import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class PiratesChest
    extends GatherAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "klątwa";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.PIRATES_CHEST,
            "skrzynia piratów",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    option1(resolver: IPlayerCharacter) {
    }

    option2(resolver: IPlayerCharacter) {
        this.startDrawingMysteryCards(0, 0, 2, resolver);
    }

    triggerEventEffect() {
        //TODO: every player can use only 1 pawn.
    }
}
