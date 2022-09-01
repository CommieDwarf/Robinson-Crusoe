import { ICharacter } from "../../../interfaces/Characters/Character";
import { IPlayer, IPlayerRenderData } from "../../../interfaces/Player";
import { IPlayerCharacter } from "../../../interfaces/Characters/PlayerCharacter";

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
  private _character: IPlayerCharacter | null = null;
  private readonly _id: number;

  constructor(name: string, color: string, id: number) {
    this._name = name;
    this._color = color;
    this._id = id;
  }

  get renderData(): IPlayerRenderData {
    return {
      name: this.name,
      color: this.color,
      id: this.id,
      characterId: this.getCharacter().id,
    };
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

  unsetCharacter() {
    this._character = null;
  }
}
