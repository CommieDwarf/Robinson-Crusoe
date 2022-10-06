import {
  BuiltTileStructure,
  ITile,
  ITileRenderData,
  TileStructure,
} from "../../../interfaces/Tiles/Tile";
import { TileType } from "../../constants/tilleTypes";

export class Tile implements ITile {
  // TODO: change name "structure" to "position"
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

  get renderData(): ITileRenderData {
    return {
      helpersRequired: this.helpersRequired,
      id: this.id,
      show: this.show,
      structure: this.structure,
      type: this.type,
    };
  }

  private readonly _structure: TileStructure;
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
