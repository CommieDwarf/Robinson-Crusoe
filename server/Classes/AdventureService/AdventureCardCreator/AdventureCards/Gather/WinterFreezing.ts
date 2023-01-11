import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {INVENTION_STARTER} from "../../../../../../interfaces/InventionService/Invention";

export class WinterFreezing extends GatherAdventureCard implements IAdventureCard {
    protected _eventNamePL = "";

    constructor(game: IGame) {
        super(ADVENTURE_CARD_GATHER.VIPER, "zimowy chłód", false, game);
    }

    option1() {
        //TODO: deplete source on the tile.
    }

}