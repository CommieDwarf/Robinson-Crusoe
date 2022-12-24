import {
  BuiltTileStructure,
  ITile,
  ITileRenderData,
  TilePosition,
} from "../../../../interfaces/TileService/ITile";
import { TileType } from "../../../../constants/tilleTypes";
import { IGame } from "../../../../interfaces/Game";

export class Tile implements ITile {
  private readonly _position: TilePosition;
  private readonly _id: number;
  private _show: boolean;
  private _type: TileType | null;
  private _helpersRequired: number;
  private _canCampBeSettled = false;
  private readonly _game: IGame;
  private _camp: boolean;

  builtStructures = {
    roof: 0,
    shelter: 0,
    palisade: 0,
  };

  constructor(
    position: TilePosition,
    id: number,
    camp: boolean,
    tileType: TileType | null,
    game: IGame
  ) {
    this._position = position;
    this._id = id;
    this._camp = camp;
    this._type = tileType;
    this._game = game;
    this._show = camp;
  }

  get renderData(): ITileRenderData {
    return {
      helpersRequired: this.helpersRequired,
      id: this.id,
      show: this.show,
      position: this.position,
      tileType: this.tileType,
      canCampBeSettled: this.canCampBeSettled,
      camp: this.camp,
    };
  }

  get camp(): boolean {
    return this._camp;
  }

  set camp(value: boolean) {
    this._camp = value;
  }

  get canCampBeSettled(): boolean {
    return this._canCampBeSettled && this._game.phaseService.phase === "night";
  }

  set canCampBeSettled(value: boolean) {
    this._canCampBeSettled = value;
  }

  get position(): TilePosition {
    return this._position;
  }

  get id(): number {
    return this._id;
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
