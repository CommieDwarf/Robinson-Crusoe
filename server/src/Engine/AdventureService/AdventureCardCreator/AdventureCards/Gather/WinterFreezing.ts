import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";
import {TILE_RESOURCE_ACTION} from "../../../../../types/TileService/TileResourceService";

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
