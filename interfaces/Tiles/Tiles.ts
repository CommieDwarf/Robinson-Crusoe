import { Tile } from "../../server/Classes/Tiles/Tiles";
import { TileType } from "./Tile";

export interface ITiles {
  tiles: Tile[];
  tileStack: TileType[];
  revealTile: (id: number) => void;
  setRequiredHelpersAmount: (tileId: number, amount: number) => void;
  setAllRequiredHelpersAmount: (amount: number) => void;
  showAdjacentTiles: (tileId: number) => void;
}

