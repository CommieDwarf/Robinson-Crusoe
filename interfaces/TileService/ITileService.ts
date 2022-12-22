import { ITile, ITileRenderData, TerrainType, TileType } from "./ITile";
import { IGraph } from "../Graph/Graph";

export interface ITilesServiceRenderData {
  tiles: ITileRenderData[];
  campTileId: number;
}

export interface ITileService {
  tiles: ITile[];
  campTile: ITile;
  previousCampTile: ITile | null;
  explore: (id: number) => void;
  terrainTypesExplored: Set<TerrainType>;
  renderData: ITilesServiceRenderData;
  forceCampTransition: () => void;
  isCampTransitionAvailable: () => boolean;
  gather: (side: "left" | "right", tileId: number, logSource: string) => void;
  getTile: (id: number) => ITile;
}
