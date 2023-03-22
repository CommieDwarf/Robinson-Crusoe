import {ITile, ITileRenderData, TERRAIN_TYPE} from "./ITile";

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

    isTileMarkedForAction: boolean;
    terrainTypesExplored: Set<TERRAIN_TYPE>;
    canCampBeMoved: () => boolean;
    depleteResource: (tileID: number, side: "left" | "right") => void;
    basket: boolean;
    sack: boolean;
    axe: boolean;
    resourceAmountToDeplete: number;
    forceCampMovement: () => void;

    resetSideAssignedPawns: () => void;
    gather: (side: "left" | "right", tileId: number, logSource: string) => void;
    getTile: (id: number) => ITile;
    moveCamp: (tileID: number) => void;
    explore: (id: number) => void;
    markTileForAnyResourceDepletion: (tileID: number, sourceLog: string) => void;
    markClosestResourceForDepletion: (resource: "food" | "wood") => void;
    markTilesAroundCampForResourceDepletion: () => void;
    countMarkedResourceForDepletion: () => number;
    clearMarkedForDepletion: () => void;

    renderData: ITilesServiceRenderData;
}
