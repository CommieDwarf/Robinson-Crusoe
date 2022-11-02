import { ITile, ITileRenderData, TerrainType, TileType } from "./Tile";

export interface ITilesServiceRenderData {
  tiles: ITileRenderData[];
  campTileId: number;
}

export interface ITilesService {
  tiles: ITile[];
  tileStack: TileType[];
  explore: (id: number) => void;
  setRequiredHelpersAmount: (tileId: number, amount: number) => void;
  setAllRequiredHelpersAmount: (amount: number) => void;
  showAdjacentTiles: (tileId: number) => void;
  terrainTypesExplored: Set<TerrainType>;
  renderData: ITilesServiceRenderData;
  forceCampTransition: () => void;
  isCampTransitionAvailable: () => boolean;
  currentCampTile: ITile;
  previousCampTile: ITile | null;
  getExploredTile: (id: number) => ITile;
  gather: (side: "left" | "right", tileId: number) => void;
}
