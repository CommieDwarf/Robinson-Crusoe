import {Invention} from "../../Invention";
import {IInvention, INVENTION_STARTER, INVENTION_TYPE,} from "../../../../../types/InventionService/Invention";
import {IGame} from "../../../../../types/Game";
import {TERRAIN_TYPE} from "../../../../../types/TileService/ITile";

export class Dam extends Invention implements IInvention {
    protected readonly _namePL = "tama";

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
        this._game.resourceService.addBasicResourceToFuture(
            "dryFood",
            2,
            this._logSource
        );
    }

    onDestruction() {
        this._game.resourceService.spendBasicResourceIfPossible(
            "dryFood",
            2,
            this._logSource
        );
    }
}
