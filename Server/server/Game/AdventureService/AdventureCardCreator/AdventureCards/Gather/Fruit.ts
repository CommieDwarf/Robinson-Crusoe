import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";

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
