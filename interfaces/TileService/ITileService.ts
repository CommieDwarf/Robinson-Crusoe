import { ITile, ITileRenderData, TERRAIN_TYPE } from "./ITile";

export interface ITilesServiceRenderData {
  tiles: ITileRenderData[];
  campJustMoved: boolean;
  campTile: ITileRenderData;
  resourceAmountToDeplete: number;
}

export interface ITileService {
  tiles: ITile[];
  campTile: ITile;
  previousCampTile: ITile | null;
  campJustMoved: boolean;
  terrainTypesExplored: Set<TERRAIN_TYPE>;
  canCampBeMoved: () => boolean;
  depleteResource: (tileID: number, side: "left" | "right") => void;
  basket: boolean;
  sack: boolean;
  axe: boolean;
  resourceAmountToDeplete: number;
  forceCampMovement: () => void;
  gather: (side: "left" | "right", tileId: number, logSource: string) => void;
  getTile: (id: number) => ITile;
  moveCamp: (tileID: number) => void;
  explore: (id: number) => void;
  markTileForAnyResourceDepletion: (tileID: number) => void;
  markClosestResourceForDepletion: (resource: "food" | "wood") => void;
  markTilesAroundCampForResourceDepletion: () => void;
  countMarkedResourceForDepletion: () => number;
  clearMarkedForDepletion: () => void;

  renderData: ITilesServiceRenderData;
}
