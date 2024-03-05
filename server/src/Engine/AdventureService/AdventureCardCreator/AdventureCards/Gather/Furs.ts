import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class Furs extends GatherAdventureCard implements IAdventureCard {
    protected _eventNamePL = "insekty";

    constructor(game: IGame) {
        super(ADVENTURE_CARD_GATHER.FURS, "skóry", true, game, "discard", "");
    }

    option1(resolver: IPlayerCharacter) {
    }

    option2(resolver: IPlayerCharacter) {
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
