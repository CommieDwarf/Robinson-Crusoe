import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_BUILD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class Unmotivated extends BuildAdventureCard implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.UNMOTIVATED,
            "tools are breaking",
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
            this._name
        );
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.characterService.decrDeterminationAllPlayerCharacters(
            1,
            this._eventName
        );
    }
}
