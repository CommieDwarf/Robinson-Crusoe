import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {ADVENTURE_CARD_BUILD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IGame} from "@shared/types/Game/Game";
import {ACTION} from "@shared/types/Game/ACTION";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";

export class Accident extends BuildAdventureCard implements IAdventureCard {
    constructor(game: IGame) {
        super(ADVENTURE_CARD_BUILD.ACCIDENT, "gangrene", false, game, "shuffle", "");
    }

    resolveOption1(resolver: IPlayerCharacter) {
        resolver.setWound("leg", ACTION.BUILD, this.name);
        this.setResolver(resolver);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        const resolver = this.getResolver();
        if (this._game.inventionService.isBuilt(INVENTION_STARTER.MEDICINE)) {
            this._game.characterService.hurt(resolver, 1, this._eventName);
        } else {
            this._game.characterService.hurt(resolver, 3, this._eventName);
        }
        resolver.unsetWound("leg", ACTION.BUILD, this._eventName);
    }
}
