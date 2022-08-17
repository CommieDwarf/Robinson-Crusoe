import ITile, { TerrainType, TileType } from "./Tile";

export interface ITilesService {
  tiles: ITile[];
  tileStack: TileType[];
  revealTile: (id: number) => void;
  setRequiredHelpersAmount: (tileId: number, amount: number) => void;
  setAllRequiredHelpersAmount: (amount: number) => void;
  showAdjacentTiles: (tileId: number) => void;
  terrainTypesExplored: Set<TerrainType>;
}
