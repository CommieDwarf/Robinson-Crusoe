import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";

export class LostInTheWoods
    extends ExploreAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.LOST_IN_THE_WOODS,
            "zagubiony w lesie",
            false,
            game,
            "discard",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        this._game.characterService.decrDeterminationOrGetHurt(resolver, 2, this._namePL);
    }
}
