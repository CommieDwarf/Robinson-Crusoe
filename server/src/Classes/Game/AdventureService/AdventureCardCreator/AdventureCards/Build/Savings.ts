import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_BUILD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class Savings extends BuildAdventureCard implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.SAVINGS,
            "bad construction",
            true,
            game,
            "shuffle",
            "discard"
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        this._game.resourceService.addBasicResourceToFuture("wood", 2, this._name);
        this.shuffleIntoEventDeck();
    }

    resolveOption2(resolver: IPlayerCharacter) {

    }

    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._eventName);
    }
}
