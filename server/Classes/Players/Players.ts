export class Player {
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

  get character(): Character {
    return this._character;
  }

  set character(value: Character) {
    this._character = value;
  }

  get id(): number {
    return this._id;
  }

  private _name: string;
  private _color: string;
  private _character: Character;
  private readonly _id: number;

  constructor(name: string, color: string, character: Character, id: number) {
    this._name = name;
    this._color = color;
    this._character = character;
    this._id = id;
  }
}

const player = new Player("Konrad", "orange", characters.cook, 1);

export default player;
