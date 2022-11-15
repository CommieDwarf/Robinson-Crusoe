import { EqList } from "../../../constants/eqList";
import { IGame } from "../../../interfaces/Game";
import { IItem, IItemRenderData } from "../../../interfaces/Equipment/Item";

export class Item implements IItem {
  get name(): keyof EqList {
    return this._name;
  }

  get namePL(): string {
    return this._namePL;
  }

  get uses(): number {
    return this._uses;
  }

  get game(): IGame {
    return this._game;
  }

  get renderData(): IItemRenderData {
    return { name: this.name, namePL: this.namePL, uses: this.uses };
  }

  private readonly _name: keyof EqList;
  private readonly _namePL: string;
  private _uses = 2;
  private readonly _game: IGame;

  constructor(name: keyof EqList, namePL: string, game: IGame) {
    this._name = name;
    this._namePL = namePL;
    this._game = game;
  }

  useItemEffect() {
    throw new Error("useItemEffect method not implemented");
  }

  hasUses() {
    return this._uses > 0;
  }

  private decrementUses() {
    if (!this.hasUses()) {
      throw new Error("Item " + this._name + " is used Up!");
    }
    this._uses--;
  }

  use() {
    this.useItemEffect();
    this.decrementUses();
  }
}
