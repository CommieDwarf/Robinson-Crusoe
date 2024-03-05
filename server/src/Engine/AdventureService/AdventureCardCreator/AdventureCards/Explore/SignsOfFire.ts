import {ExploreAdventureCard} from "./ExploreAdventureCard/ExploreAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {TILE_RESOURCE_ACTION} from "../../../../../types/TileService/TileResourceService";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class SignsOfFire
    extends ExploreAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_EXPLORE.SIGNS_OF_FIRE,
            "ślady ognia",
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
