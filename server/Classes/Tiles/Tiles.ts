import shuffle from "../../../utils/shuffleArray";
import tileStructures from "../../constants/tileStructures";
import { TileStructure } from "../../../interfaces/Tiles/Tile";
import tileTypes, { TileType, starterTile } from "../../constants/tilleTypes";
import ITile from "../../../interfaces/Tiles/Tile";
import { ITiles } from "../../../interfaces/Tiles/Tiles";

const starterId = 7;

export class Tile implements ITile {
  get structure(): TileStructure {
    return this._structure;
  }

  get id(): number {
    return this._id;
  }

  get starter(): boolean {
    return this._starter;
  }

  get show(): boolean {
    return this._show;
  }

  set show(value: boolean) {
    this._show = value;
  }

  get type(): TileType | null {
    return this._type;
  }

  get helpersRequired(): number {
    return this._helpersRequired;
  }

  set helpersRequired(value: number) {
    if (value < 1) {
      throw new Error("There must be atleast 1 helper required");
    }
    this._helpersRequired = value;
  }

  private readonly _structure: TileStructure;
  private readonly _id: number;
  private readonly _starter: boolean;
  private _show: boolean;
  private _type: TileType | null;
  private _helpersRequired: number;

  constructor(
    structure: TileStructure,
    id: number,
    starter: boolean,
    show: boolean,
    type: TileType | null,
    helpersRequired: number
  ) {
    this._structure = structure;
    this._id = id;
    this._starter = starter;
    this._show = show;
    this._type = type;
    this._helpersRequired = helpersRequired;
  }

  reveal(type: TileType) {
    this._type = type;
  }
}

export default class Tiles implements ITiles {
  tiles = Tiles.getInitialTiles();
  tileStack: TileType[];

  constructor() {
    this.tileStack = shuffle(tileTypes);
    this.showAdjacentTiles(starterId);
  }

  private static getInitialTiles() {
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
