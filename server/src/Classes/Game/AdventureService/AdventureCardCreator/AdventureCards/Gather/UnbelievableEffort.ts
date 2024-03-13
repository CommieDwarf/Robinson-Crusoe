import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class UnbelievableEffort
    extends GatherAdventureCard
    implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.UNBELIEVABLE_EFFORT,
            "sore arms",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
    }

    resolveOption2(resolver: IPlayerCharacter) {
        this._game.resourceService.addBasicResourceToOwned("wood", 2, this._name);
        this.setResolver(resolver);
        resolver.setWound("arm", this._action, this._name);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.characterService.hurt(this.getResolver(), 1, this._eventName);
        this.getResolver().unsetWound("arm", this._action, this._eventName);
    }
}
