import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {ADVENTURE_CARD_BUILD} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IGame} from "../../../../../types/Game";
import {ACTION} from "../../../../../types/ACTION";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";
import {INVENTION_STARTER} from "../../../../../types/InventionService/Invention";

//TODO: unimplemented.
export class Accident extends BuildAdventureCard implements IAdventureCard {
    protected _eventNamePL = "gangrena";

    constructor(game: IGame) {
        super(ADVENTURE_CARD_BUILD.ACCIDENT, "wypadek", false, game, "shuffle", "");
    }

    option1(resolver: IPlayerCharacter) {
        resolver.setWound("leg", ACTION.BUILD, this._namePL);
        this.setResolver(resolver);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        const resolver = this.getResolver();
        if (this._game.inventionService.isBuilt(INVENTION_STARTER.MEDICINE)) {
            this._game.characterService.hurt(resolver, 1, this._eventNamePL);
        } else {
            this._game.characterService.hurt(resolver, 3, this._eventNamePL);
        }
        resolver.unsetWound("leg", ACTION.BUILD, this._eventNamePL);
    }
}
