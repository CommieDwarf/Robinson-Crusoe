import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {CONSTRUCTION} from "../../../../../../interfaces/ConstructionService/Construction";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class ConstructionIsWeak
    extends BuildAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "trach!";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.CONSTRUCTION_IS_WEAK,
            "marna konstrukcja",
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
        const construction = this._game.constructionService.getConstruction(
            CONSTRUCTION.ROOF
        );
        this._game.constructionService.setDividedLvlByTwoRoundedDown(CONSTRUCTION.ROOF, this._eventNamePL)
    }
}
