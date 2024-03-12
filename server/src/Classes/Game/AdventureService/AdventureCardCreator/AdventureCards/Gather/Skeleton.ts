import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class Skeleton extends GatherAdventureCard implements IAdventureCard {
    protected _eventNamePL = "wspomnienia martwego odkrywcy";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.SKELETON,
            "szkielet",
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
        //TODO: add random invention.
        this._game.moraleService.lvlUp(1, this._eventNamePL);
    }
}
