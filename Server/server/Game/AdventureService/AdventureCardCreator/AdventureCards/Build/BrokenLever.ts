import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {CONSTRUCTION} from "../../../../../../../interfaces/ConstructionService/Construction";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";

export class BrokenLever extends BuildAdventureCard implements IAdventureCard {
    protected _eventNamePL = "";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.BROKEN_LEVER,
            "złamana dźwignia",
            false,
            game,
            "discard",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        this._game.constructionService.lvlDownOrGetHurt(
            CONSTRUCTION.WEAPON,
            1,
            this.namePL
        );
    }
}
