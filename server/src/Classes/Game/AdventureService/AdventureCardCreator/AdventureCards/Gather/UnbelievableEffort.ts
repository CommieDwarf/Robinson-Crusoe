import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class UnbelievableEffort
    extends GatherAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "obolałe ramiona";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.UNBELIEVABLE_EFFORT,
            "niewiarygodny wysiłek",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    option1(resolver: IPlayerCharacter) {
    }

    option2(resolver: IPlayerCharacter) {
        this._game.resourceService.addBasicResourceToOwned("wood", 2, this._namePL);
        this.setResolver(resolver);
        resolver.setWound("arm", this._action, this._namePL);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.characterService.hurt(this.getResolver(), 1, this._eventNamePL);
        this.getResolver().unsetWound("arm", this._action, this._eventNamePL);
    }
}
