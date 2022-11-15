import {
  IPlayer,
  IPlayerRenderData,
} from "../../../interfaces/PlayerService/Player";
import { IPlayerCharacter } from "../../../interfaces/Characters/PlayerCharacter";

export class Player implements IPlayer {
  private _name: string;
  private _color: string;
  private _character: IPlayerCharacter;
  private readonly _id: number;

  constructor(
    name: string,
    color: string,
    id: number,
    character: IPlayerCharacter
  ) {
    this._name = name;
    this._color = color;
    this._id = id;
    this._character = character;
  }

  get renderData(): IPlayerRenderData {
    return {
      name: this.name,
      color: this.color,
      id: this.id,
      character: this.getCharacter().renderData,
    };
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  get id(): number {
    return this._id;
  }

  getCharacter(): IPlayerCharacter {
    if (!this._character) {
      throw new Error(
        "There is no character assigned to player: " + this._name
      );
    }
    return this._character;
  }

  setCharacter(value: IPlayerCharacter) {
    this._character = value;
  }
}
