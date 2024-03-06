import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class Spider extends GatherAdventureCard implements IAdventureCard {
    protected _eventNamePL = "ugryzienie w kark";

    constructor(game: IGame) {
        super(ADVENTURE_CARD_GATHER.SPIDER, "pająk", false, game, "shuffle", "");
    }

    option1(resolver: IPlayerCharacter) {
        this.setResolver(resolver);
        resolver.setWound("head", this._action, this._namePL);
    }

    triggerEventEffect() {
        //TODO: guy with wound can use only 1 pawn. discard wound.
    }
}
