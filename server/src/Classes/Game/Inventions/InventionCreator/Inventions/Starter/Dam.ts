import {Invention} from "../../Invention";
import {IInvention, INVENTION_STARTER, INVENTION_TYPE,} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {TERRAIN_TYPE} from "@shared/types/Game/TileService/ITile";

export class Dam extends Invention implements IInvention {

    constructor(game: IGame) {
        super(
            INVENTION_STARTER.DAM,
            {terrainType: TERRAIN_TYPE.RIVER, inventions: null},
            INVENTION_TYPE.STARTER,
            game,
            {type: "wood", amount: 1}
        );
    }

    onBuild() {
        super.onBuild();
        this._game.resourceService.addBasicResourceToFuture(
            "dryFood",
            2,
            this._logSource
        );
    }

    onDestruction() {
        super.onDestruction();
        this._game.resourceService.spendBasicResourceIfPossible(
            "dryFood",
            2,
            this._logSource
        );
    }
}
