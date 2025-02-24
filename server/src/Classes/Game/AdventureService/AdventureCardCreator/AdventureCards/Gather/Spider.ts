import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class Spider extends GatherAdventureCard implements IAdventureCard {

    constructor(game: IGame) {
        super(ADVENTURE_CARD_GATHER.SPIDER, "neck bite", false, game, "shuffle", "");
    }

    resolveOption1(resolver: IPlayerCharacter) {
        this.setResolver(resolver);
        resolver.setWound("head", this._action, this._name);
    }

    triggerEventEffect() {
    }
}
