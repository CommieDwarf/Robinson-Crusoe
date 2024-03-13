import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_BUILD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class Tired extends BuildAdventureCard implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.TIRED,
            "dispute",
            true,
            game,
            "shuffle",
            "discard"
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        this._game.characterService.heal(resolver, 2, this.name);
        this.shuffleIntoEventDeck();
    }

    resolveOption2(resolver: IPlayerCharacter) {
    }

    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._eventName);
    }
}
