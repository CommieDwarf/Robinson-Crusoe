import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";
import {TILE_RESOURCE_ACTION} from "../../../../../../../interfaces/TileService/TileResourceService";

export class WinterFreezing
    extends GatherAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.WINTER_FREEZING,
            "zimowy chłód",
            false,
            game,
            "discard",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        const tile = this.getTile();
        this._game.tileService.markTileResourcesForAction([tile], TILE_RESOURCE_ACTION.DEPLETE, this._namePL, null);
    }
}
