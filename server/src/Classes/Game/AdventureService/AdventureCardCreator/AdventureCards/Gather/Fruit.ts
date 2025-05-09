import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class Fruit extends GatherAdventureCard implements IAdventureCard {

    constructor(game: IGame) {
        super(ADVENTURE_CARD_GATHER.FRUIT, "stomachache", false, game, "shuffle", "");
    }

    resolveOption1(resolver: IPlayerCharacter) {
        this.setResolver(resolver);
        resolver.setWound("stomach", this._action, this._eventName);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
    }
}
