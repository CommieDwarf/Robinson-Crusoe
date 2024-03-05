import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {CONSTRUCTION} from "../../../../../types/ConstructionService/Construction";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class Construction extends BuildAdventureCard implements IAdventureCard {
    protected _eventNamePL = "mocniejsza konstrukcja";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.CONSTRUCTION,
            "konstrukcja",
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
        if (
            this._game.constructionService.getConstruction(CONSTRUCTION.SHELTER).lvl >
            0
        ) {
            this._game.constructionService.lvlUpConstruction(
                CONSTRUCTION.PALISADE,
                1,
                this._eventNamePL
            );
        }
    }
}
