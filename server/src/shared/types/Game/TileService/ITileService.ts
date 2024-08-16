import {ITile, ITileRenderData, TERRAIN_TYPE, TILE_ACTION} from "./ITile";
import {Side, TILE_RESOURCE_ACTION} from "./TileResourceService";
import {TileType} from "@shared/types/Game/TileService/TileResourceInfo";

export interface ITilesServiceRenderData {
    tiles: ITileRenderData[];
    campJustMoved: boolean;
    campTile: ITileRenderData;
    isMarkedActionRemaining: boolean;

}

export interface ITileService {
    tiles: ITile[];
    campTile: ITile;
    previousCampTile: ITile | null;
    campJustMoved: boolean;
    tilesAroundCamp: ITile[]
    isMarkedActionRemaining: boolean;
    exploredTerrainTypes: Set<TERRAIN_TYPE>;
    canCampBeMoved: () => boolean;
    updateDistance: () => void;
    triggerMarkedAction: (tileId: number) => void;
    triggerMarkedResourceAction: (tileId: number, side: Side) => void;
    markTilesForAction: (tiles: ITile[],
                         action: TILE_ACTION,
                         requiredActionAmount: number,
                         source: string,
                         shouldApplyDmg: boolean
    ) => void;

    markTileResourcesForAction: (tiles: ITile[],
                                 action: TILE_RESOURCE_ACTION,
                                 source: string,
                                 resource: "food" | "wood" | null,
                                 requiredActionAmount: number,
                                 shouldApplyDmg: boolean) => void;


    resetResourceAssignedPawns: () => void;

    switchOrderInTileStack: (tileType: TileType, targetPosition: "top" | "bottom" | number) => void

    pickTileTypesFromStack: (amount: number) => TileType[];
    gather: (sides: Side[], tileId: number, logSource: string, production?: boolean) => void;
    getTile: (id: number) => ITile;
    moveCamp: (tileID: number) => void;
    explore: (id: number) => void;

    updateExploredTerrainTypes: () => void;
    renderData: ITilesServiceRenderData;
}
