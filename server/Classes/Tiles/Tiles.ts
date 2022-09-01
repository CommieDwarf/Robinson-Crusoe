import shuffle from "../../../utils/shuffleArray";
import tileStructures from "../../constants/tileStructures";
import tileTypes, { TileType, starterTile } from "../../constants/tilleTypes";
import {
  ITilesService,
  ITilesServiceRenderData,
} from "../../../interfaces/Tiles/Tiles";
import { Tile } from "./Tile";
import { ITile, TerrainType } from "../../../interfaces/Tiles/Tile";

const starterId = 7;

export class TilesService implements ITilesService {
  tiles: ITile[];
  tileStack: TileType[];
  terrainTypesExplored: Set<TerrainType>;

  get renderData(): ITilesServiceRenderData {
    return {
      tiles: this.tiles.map((tile) => tile.renderData),
    };
  }

  constructor() {
    this.tileStack = shuffle(tileTypes);
    this.terrainTypesExplored = new Set<TerrainType>(["beach"]);
    this.tiles = this.getInitialTiles();
    this.showAdjacentTiles(starterId);
  }

  private getInitialTiles() {
    const tiles = [];
    for (let i = 0; i < 15; i++) {
      if (i === starterId) {
        tiles.push(new Tile(tileStructures[i], i, true, true, starterTile, 0));
      } else {
        tiles.push(new Tile(tileStructures[i], i, false, false, null, 0));
      }
    }
    return tiles;
  }

  revealTile(id: number) {
    const tileType = this.tileStack.pop();
    if (!tileType) {
      throw new Error("Empty tile type stack!");
    }
    this.findTile(id).reveal(tileType);
    this.terrainTypesExplored.add(tileType.terrainType);
  }

  setRequiredHelpersAmount(id: number, helpers: number) {
    this.findTile(id).helpersRequired = helpers;
  }

  setAllRequiredHelpersAmount(helpers: number) {
    this.tiles.forEach((tile) => (tile.helpersRequired = helpers));
  }

  showAdjacentTiles(id: number) {
    const tile = this.findTile(id);
    tile.structure.borderTiles.forEach((id) => {
      this.findTile(id).show = true;
    });
  }

  private findTile(id: number) {
    const tile = this.tiles.find((t) => t.id === id);
    if (!tile) {
      throw new Error("tile with id: " + id + "has been not found");
    } else {
      return tile;
    }
  }
}
