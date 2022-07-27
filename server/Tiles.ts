import shuffle from "../utils/shuffleArray";
import tileStructures from "./tiles/tileStructures";
import { TileStructure } from "../interfaces/Tile";
import tileTypes, { TileType } from "./tiles/tilleTypes";
import ITile from "../interfaces/Tile";

export class Tile implements ITile {
  structure: TileStructure;
  id: number;
  starter: boolean;
  show: boolean;
  type: TileType | null;
  helpersRequired: number;

  constructor(
    structure: TileStructure,
    id: number,
    starter: boolean,
    show: boolean,
    type: TileType | null,
    helpersRequired: number
  ) {
    this.structure = structure;
    this.id = id;
    this.starter = starter;
    this.show = show;
    this.type = type;
    this.helpersRequired = helpersRequired;
  }

  setShow(show: boolean) {
    this.show = show;
  }

  reveal(type: TileType) {
    this.type = type;
  }

  unreveal() {
    this.type = null;
  }

  setHelpersRequired(num: number) {
    if (num < 1) {
      throw new Error("1 Helper must be at least required");
    } else {
      this.helpersRequired = num;
    }
  }
}

export default class Tiles {
  tiles: Tile[];
  tileStack: TileType[];

  constructor() {
    this.tiles = Tiles.getBasicTiles();
    this.tileStack = shuffle(tileTypes);
  }

  private static getBasicTiles() {
    const tiles = [];
    for (let i = 0; i < 15; i++) {
      tiles.push(new Tile(tileStructures[i], i, false, false, null, 2));
    }
    tiles[7].show = true;
    tiles[7].type = new TileType(
      0,
      "beach",
      { left: "wood", right: "food" },
      { discoveryToken: 0, totem: false, naturalShelter: false }
    );
    tiles[2].show = true;
    tiles[6].show = true;
    tiles[11].show = true;
    return tiles;
  }

  setShow(id: number, show: boolean) {
    this.findTile(id).setShow(show);
  }

  reveal(id: number) {
    const tileType = this.tileStack.pop();
    if (tileType) {
      this.findTile(id).reveal(tileType);
      return true;
    } else {
      return false;
    }
  }

  unreveal(id: number) {
    this.findTile(id).unreveal();
  }

  setHelpersRequired(id: number, helpers: number) {
    this.findTile(id).setHelpersRequired(helpers);
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
