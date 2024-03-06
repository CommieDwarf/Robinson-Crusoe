import {IInvention, INVENTION_CASTAWAYS, INVENTION_TYPE,} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {TERRAIN_TYPE} from "@shared/types/Game/TileService/ITile";
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
        this._game.tileService.campTile.addModifierByResource("wood", this._namePL);
    }

    onDestruction() {
        this._game.tileService.campTile.removeResourceModifier(null, "wood", this._namePL);
    }
}
