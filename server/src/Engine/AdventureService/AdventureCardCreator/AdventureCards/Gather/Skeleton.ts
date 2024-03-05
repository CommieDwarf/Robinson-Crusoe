import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

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

    option1(resolver: IPlayerCharacter) {
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //TODO: add random invention.
        this._game.moraleService.lvlUp(1, this._eventNamePL);
    }
}
