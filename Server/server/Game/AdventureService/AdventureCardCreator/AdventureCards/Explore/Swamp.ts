import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";

export class Swamp extends ExploreAdventureCard implements IAdventureCard {
    protected _eventNamePL = "";

    constructor(game: IGame) {
        super(ADVENTURE_CARD_EXPLORE.SWAMP, "bagniska", false, game, "discard", "");
    }

    option1(resolver: IPlayerCharacter) {
        this.getTile().setTileModifier("timeConsumingAction", this._namePL);
    }
}
