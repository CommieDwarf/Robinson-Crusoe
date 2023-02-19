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
  private _requiredHelperAmount: number = 0;
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
      requiredHelperAmount: this.requiredHelperAmount,
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

  get requiredHelperAmount(): number {
    return this._requiredHelperAmount;
  }

  set requiredHelperAmount(value: number) {
    this._requiredHelperAmount = value;
  }

  public clearMarkedForDepletion() {
    if (this.tileType) {
      this.tileType.resources.right.markedForDepletion = false;
      this.tileType.resources.left.markedForDepletion = false;
    }
  }

  public canResourceBeDepleted(side: "left" | "right") {
    return !(
      this.tileType?.resources[side].depleted ||
      this.tileType?.resources[side].resource === "beast"
    );
  }

  public getSideByResource(resource: "wood" | "food") {
    if (this.tileType?.resources.right.resource === resource) {
      return "right";
    } else if (this.tileType?.resources.left.resource === resource) {
      return "left";
    } else {
      return null;
    }
  }

  depleteResource(side: "left" | "right") {
    if (this.tileType) {
      this.tileType.resources[side].depleted = true;
      this.tileType.resources[side].markedForDepletion = false;
    }
  }

  reverseDepleteResource(side: "left" | "right") {
    if (this.tileType) {
      this.tileType.resources[side].depleted = false;
    }
  }

  markForDepletion(side: "left" | "right") {
    if (!this.tileType) {
      throw new Error(`depleting on tile without tileType. id: ${this.id}`);
    }
    if (this.canResourceBeDepleted(side)) {
      this.tileType.resources[side].markedForDepletion = true;
    }
  }

  hasResource(resource: "wood" | "food") {
    return (
      this.tileType?.resources.left.resource === resource ||
      this.tileType?.resources.right.resource === resource
    );
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
