import { ITile, ITileRenderData, TERRAIN_TYPE } from "./ITile";

export interface ITilesServiceRenderData {
  tiles: ITileRenderData[];
  campJustMoved: boolean;
  campTile: ITileRenderData;
}

export interface ITileService {
  tiles: ITile[];
  campTile: ITile;
  previousCampTile: ITile | null;
  campJustMoved: boolean;
  terrainTypesExplored: Set<TERRAIN_TYPE>;
  canCampBeMoved: () => boolean;
  basket: boolean;
  sack: boolean;
  axe: boolean;

  forceCampMovement: () => void;
  gather: (side: "left" | "right", tileId: number, logSource: string) => void;
  getTile: (id: number) => ITile;
  moveCamp: (tileID: number) => void;
  explore: (id: number) => void;

  renderData: ITilesServiceRenderData;
}
