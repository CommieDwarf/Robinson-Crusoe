import {
    IInvention,
    INVENTION_CASTAWAYS,
    INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../interfaces/Game";
import {TERRAIN_TYPE} from "../../../../../../interfaces/TileService/ITile";
import {BasicResources} from "../../../../ResourceService/BasicResources";
import {Invention} from "../../Invention";

export class Axe extends Invention implements IInvention {
    protected readonly _namePL = "siekiera";

    constructor(game: IGame) {
        super(
            INVENTION_CASTAWAYS.AXE,
            {terrainType: TERRAIN_TYPE.MOUNTAINS, inventions: null},
            INVENTION_TYPE.SCENARIO,
            game,
            {type: "wood", amount: 1}
        );
    }

    onBuild() {
        this._game.tileService.axe = true;
    }

    onDestruction() {
        this._game.tileService.axe = false;
    }
}
