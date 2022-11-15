import {
  BuiltTileStructure,
  ITile,
  ITileRenderData,
  TilePosition,
} from "../../../interfaces/Tiles/Tile";
import { TileType } from "../../../constants/tilleTypes";

export class Tile implements ITile {
  private readonly _position: TilePosition;
  private readonly _id: number;
  private readonly _starter: boolean;
  private _show: boolean;
  private _type: TileType | null;
  private _helpersRequired: number;
  builtStructures = {
    roof: 0,
    shelter: 0,
    palisade: 0,
  };

  constructor(
    position: TilePosition,
    id: number,
    starter: boolean,
    show: boolean,
    tileType: TileType | null,
    helpersRequired: number
  ) {
    this._position = position;
    this._id = id;
    this._starter = starter;
    this._show = show;
    this._type = tileType;
    this._helpersRequired = helpersRequired;
  }

  get renderData(): ITileRenderData {
    return {
      helpersRequired: this.helpersRequired,
      id: this.id,
      show: this.show,
      position: this.position,
      tileType: this.tileType,
    };
  }

  get position(): TilePosition {
    return this._position;
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

  get tileType(): TileType | null {
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

  reveal(type: TileType) {
    this._type = type;
  }

  setStructureLvl(structure: "roof" | "palisade" | "shelter", amount: number) {
    this.builtStructures[structure] = amount;
  }

  incrementStructureLvl(structure: BuiltTileStructure, amount: number) {
    this.builtStructures[structure] += amount;
  }

  // TODO: implement edge cases
  decrementStructureLvl(structure: BuiltTileStructure, amount: number) {
    this.builtStructures[structure] -= amount;
  }

  resetStructures() {
    this.builtStructures = {
      roof: 0,
      shelter: 0,
      palisade: 0,
    };
  }
}
