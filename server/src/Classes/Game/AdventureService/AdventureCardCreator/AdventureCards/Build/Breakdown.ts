import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_BUILD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class Breakdown extends BuildAdventureCard implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.BREAKDOWN,
            "it's going well",
            false,
            game,
            "shuffle",
            ""
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        this._game.moraleService.lvlDown(1, this.name);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        const character = this._game.playerService.primePlayer.getCharacter();
        this._game.characterService.incrDetermination(
            character,
            2,
            this._eventName
        );
    }
}
