import {ITile, ITileRenderData, TERRAIN_TYPE, TILE_ACTION} from "./ITile";
import {Side, TILE_RESOURCE_ACTION} from "./TileResourceService";

export interface ITilesServiceRenderData {
    tiles: ITileRenderData[];
    campJustMoved: boolean;
    campTile: ITileRenderData;
    resourceAmountToDeplete: number;
    isTileMarkedForAction: boolean;

}

export interface ITileService {
    tiles: ITile[];
    campTile: ITile;
    previousCampTile: ITile | null;
    campJustMoved: boolean;
    tilesAroundCamp: ITile[]
    isTileMarkedForAction: boolean;
    terrainTypesExplored: Set<TERRAIN_TYPE>;
    canCampBeMoved: () => boolean;
    basket: boolean;
    sack: boolean;
    axe: boolean;
    forceCampMovement: () => void;
    updateDistance: () => void;
    triggerMarkedTileAction: (tileId: number) => void;
    triggerMarkedTileResourceAction: (tileId: number, side: Side) => void;
    markTilesForAction: (tiles: ITile[], action: TILE_ACTION, requiredCount: number, source: string) => void;
    markTileResourcesForAction: (tiles: ITile[], action: TILE_RESOURCE_ACTION, source: string, concreteResource: "food" | "wood" | null) => void;
    markResourceTilesForActionOrGetHurt: (tiles: ITile[], action: TILE_RESOURCE_ACTION, requiredMarkCount: number, source: string, concreteResource: "food" | "wood" | null) => void;

    countHowManyTilesCanBeMarkedForAction: (tiles: ITile[], action: TILE_ACTION) => number;
    countHowManyResourcesCanBeMarkedForAction: (tiles: ITile[], action: TILE_RESOURCE_ACTION, source: string, concreteResource?: "wood" | "food" | null) => number;
    resetResourceAssignedPawns: () => void;
    gather: (side: "left" | "right", tileId: number, logSource: string) => void;
    getTile: (id: number) => ITile;
    moveCamp: (tileID: number) => void;
    explore: (id: number) => void;


    renderData: ITilesServiceRenderData;
}
