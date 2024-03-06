import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class Fruit extends GatherAdventureCard implements IAdventureCard {
    protected _eventNamePL = "ból brzucha";

    constructor(game: IGame) {
        super(ADVENTURE_CARD_GATHER.FRUIT, "owoce", false, game, "shuffle", "");
    }

    option1(resolver: IPlayerCharacter) {
        this.setResolver(resolver);
        resolver.setWound("stomach", this._action, this._eventNamePL);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //TODO: implement
    }
}
