import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class Tired extends BuildAdventureCard implements IAdventureCard {
    protected _eventNamePL = "spór";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.TIRED,
            "wyczerpany",
            true,
            game,
            "shuffle",
            "discard"
        );
    }

    option1(resolver: IPlayerCharacter) {
        this._game.characterService.heal(resolver, 2, this.namePL);
        this.shuffleIntoEventDeck();
    }

    option2(resolver: IPlayerCharacter) {
    }

    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._eventNamePL);
    }
}
