import shuffle from "../../../utils/shuffleArray";
import tileStructures from "../../constants/tileStructures";
import tileTypes, { TileType, starterTile } from "../../constants/tilleTypes";
import {
  ITilesService,
  ITilesServiceRenderData,
} from "../../../interfaces/Tiles/TilesService";
import { Tile } from "./Tile";
import { ITile, TerrainType } from "../../../interfaces/Tiles/Tile";
import { IGame } from "../../../interfaces/Game";

const starterId = 7;

export class TilesService implements ITilesService {
  tiles: ITile[];
  tileStack: TileType[];
  terrainTypesExplored: Set<TerrainType>;
  currentCampTile: ITile;
  previousCampTile: ITile | null = null;
  campTransition = {
    status: false,
    forced: false,
  };
  _game: IGame;

  constructor(game: IGame) {
    this._game = game;
    this.tileStack = shuffle(tileTypes);
    this.terrainTypesExplored = new Set<TerrainType>(["beach"]);
    this.tiles = this.getInitialTiles();
    this.showAdjacentTiles(starterId);
    this.currentCampTile = this.getExploredTile(starterId);
  }

  gather(side: "left" | "right", tileId: number) {
    const tile = this.getExploredTile(tileId);
    const tileType = tile.tileType;
    if (!tile) {
      throw new Error("Can't find tile to gather. id " + tileId);
    }

    if (!tileType) {
      throw new Error("Tile has no tileType");
    }

    const resource = tile.tileType?.resources[side];

    if (!resource || resource === "beast") {
      throw new Error("can't gather" + resource);
    }

    this._game.allResources.addResourceToFuture(resource, 1, "Zbieractwo");
  }

  get renderData(): ITilesServiceRenderData {
    return {
      tiles: this.tiles.map((tile) => tile.renderData),
      campTileId: this.currentCampTile.id,
    };
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

  explore(id: number) {
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

  forceCampTransition() {
    this.campTransition.forced = true;
    this.campTransition.status = true;
  }

  isCampTransitionAvailable(): boolean {
    return true; // TODO: implement this
  }

  getExploredTile(id: number): ITile {
    const tile = this.tiles.find((tile) => tile.id === id);
    if (!tile) {
      throw new Error("Cant find explored tile with id: " + id);
    }

    return tile;
  }

  public static getTileIdFromDroppableId(droppableId: string): number {
    const droppableArr = droppableId.split("-");
    const id = parseInt(droppableArr[1]);
    if (!id) {
      throw new Error("Couldnt find tile id from " + droppableId);
    }
    return id;
  }
}
