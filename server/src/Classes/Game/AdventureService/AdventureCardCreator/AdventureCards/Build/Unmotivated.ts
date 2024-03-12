import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_BUILD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

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

    resolveOption1(resolver: IPlayerCharacter) {
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
