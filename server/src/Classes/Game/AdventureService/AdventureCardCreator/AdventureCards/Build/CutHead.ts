import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_BUILD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";

export class CutHead extends BuildAdventureCard implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.CUT_HEAD,
            "headache",
            false,
            game,
            "shuffle",
            ""
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        const character = this.getPrimeCharacter();
        this._game.characterService.incrDetermination(character, 2, this.name);
        this._game.characterService.hurt(character, 1, this.name);
        this.setResolver(resolver);
        resolver.setWound("head", this._action, this.name);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        if (!this._game.inventionService.isBuilt(INVENTION_STARTER.MEDICINE)) {
            this._game.characterService.hurt(this.getResolver(), 2, this._eventName);
        }
        this.getResolver().unsetWound("head", this._action, this._eventName);
    }
}
