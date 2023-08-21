import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class Unmotivated extends BuildAdventureCard implements IAdventureCard {
    protected _eventNamePL = "narzędzia sie psują";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.UNMOTIVATED,
            "zdemotywowany",
            false,
            game,
            "shuffle",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        this._game.characterService.decrDeterminationOrGetHurt(
            resolver,
            1,
            this._namePL
        );
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(
            1,
            this._eventNamePL
        );
    }
}
