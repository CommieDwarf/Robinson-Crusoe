import { IGame } from "../../../../interfaces/Game";
import {
  IItem,
  IItemRenderData,
  ITEM,
} from "../../../../interfaces/Equipment/Item";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";
import { ICharacter } from "../../../../interfaces/Characters/Character";

export class Item implements IItem {
  protected readonly _name: ITEM;
  protected _uses = 2;
  protected readonly _game: IGame;
  private _discarded = false;

  constructor(item: ITEM, game: IGame) {
    this._name = item;
    this._game = game;
  }

  get renderData(): IItemRenderData {
    return { name: this.name, uses: this.uses };
  }

  get name(): ITEM {
    return this._name;
  }

  get uses(): number {
    return this._uses;
  }

  get game(): IGame {
    return this._game;
  }

  get hasUses() {
    return this._uses > 0;
  }

  private decrementUses() {
    this._uses--;
    if (!this.hasUses) {
      this._discarded = true;
    }
  }

  use(user: IPlayerCharacter, target: ICharacter = user) {
    this.decrementUses();
  }
}
