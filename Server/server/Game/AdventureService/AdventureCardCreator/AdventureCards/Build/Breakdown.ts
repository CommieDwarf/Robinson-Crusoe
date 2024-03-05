import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";

export class Breakdown extends BuildAdventureCard implements IAdventureCard {
    protected _eventNamePL = "dobrze idzie";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.BREAKDOWN,
            "załamanie",
            false,
            game,
            "shuffle",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        this._game.moraleService.lvlDown(1, this.namePL);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        const character = this._game.playerService.primePlayer.getCharacter();
        this._game.characterService.incrDetermination(
            character,
            2,
            this.eventNamePL
        );
    }
}
