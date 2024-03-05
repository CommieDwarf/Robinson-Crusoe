import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class HardWork extends BuildAdventureCard implements IAdventureCard {
    protected _eventNamePL = "";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.HARD_WORK,
            "ciężka praca",
            false,
            game,
            "discard",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        this._game.resourceService.spendBasicResourceIfPossible(
            "food",
            1,
            this._namePL
        );
    }
}
