import {
  IActionStatus,
  IActionStatusRenderData,
  IResolvableItem,
  RESOLVE_ITEM_STATUS,
} from "../../../../../interfaces/ActionService/ActionStatus";
import { Action } from "../../../../../interfaces/Action";
import { IGame } from "../../../../../interfaces/Game";
import { ResolvableItem } from "../ResolvableItem/ResolvableItem";

export abstract class ActionStatus implements IActionStatus {
  protected _eventToken = false;
  protected _reRollToken = false;
  protected _additionalPawnRequired = false;
  protected _items: IResolvableItem[] = [];
  protected declare _action: Action;
  protected _game: IGame;
  public finished: boolean = false;

  protected constructor(game: IGame) {
    this._game = game;
  }

  get renderData(): IActionStatusRenderData {
    return {
      items: this._items.map((item) => item.renderData),
    };
  }

  get items(): IResolvableItem[] {
    return this._items;
  }

  get action(): Action {
    return this._action;
  }

  get eventToken(): boolean {
    return this._eventToken;
  }

  set eventToken(value: boolean) {
    this._eventToken = value;
  }

  get reRollToken(): boolean {
    return this._reRollToken;
  }

  set reRollToken(value: boolean) {
    this._reRollToken = value;
  }

  get additionalPawnRequired(): boolean {
    return this._additionalPawnRequired;
  }

  set additionalPawnRequired(value: boolean) {
    this._additionalPawnRequired = value;
  }

  resolveNextItem(): void {
    if (this._items.length === 0) {
      this.finished = true;
      return;
    }
  }

  public updateItems() {
    const slots =
      this._game.actionSlotsService.slotsOccupiedAndCategorized[this._action];

    const items = new Map<string, IResolvableItem>();
    slots.forEach((value, key) => {
      if (key.includes("leader")) {
        items.set(key, new ResolvableItem(key, value));
      }
    });
    slots.forEach((value, key) => {
      if (key.includes("helper")) {
        const item = items.get(key);
        if (!item) {
          throw new Error("Can't find item with assigned helper. " + key);
        }
        item.incrementHelpers();
      }
    });
    return new Array(items);
  }
}
