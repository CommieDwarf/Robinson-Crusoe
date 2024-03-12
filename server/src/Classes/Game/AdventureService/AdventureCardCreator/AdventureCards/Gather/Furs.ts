import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class Furs extends GatherAdventureCard implements IAdventureCard {
    protected _eventNamePL = "insekty";

    constructor(game: IGame) {
        super(ADVENTURE_CARD_GATHER.FURS, "skóry", true, game, "discard", "");
    }

    resolveOption1(resolver: IPlayerCharacter) {
    }

    resolveOption2(resolver: IPlayerCharacter) {
        this._game.resourceService.addBasicResourceToOwned(
            "leather",
            2,
            this._namePL
        );
    }

    triggerEventEffect() {
        //TODO: decrement 1 food in production Phase if possible
    }
}
