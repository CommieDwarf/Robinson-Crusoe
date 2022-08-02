import { ICharacter } from "../../../interfaces/Characters/Character";
import { IPlayer } from "../../../interfaces/Player";

export class Player implements IPlayer {
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

  private _name: string;
  private _color: string;
  private _character: ICharacter | null = null;
  private readonly _id: number;

  constructor(name: string, color: string, id: number) {
    this._name = name;
    this._color = color;
    this._id = id;
  }

  getCharacter(): ICharacter | null {
    return this._character;
  }

  setCharacter(value: ICharacter | null) {
    this._character = value;
  }
}
