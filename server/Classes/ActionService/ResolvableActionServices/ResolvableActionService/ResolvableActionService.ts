import {
  IResolvableActionService,
  IResolvableActionServiceRenderData,
  RESOLVE_ITEM_STATUS,
} from "../../../../../interfaces/ActionService/IActionResolvableService";
import {Action} from "../../../../../interfaces/Action";
import {IGame} from "../../../../../interfaces/Game";
import {ResolvableItem} from "../ResolvableItem/ResolvableItem";
import {getItemFromDroppableId} from "../../../../../utils/getItemFromDroppableId";
import {ActionSlotsService} from "../../../ActionSlotsService/ActionSlots";
import {
  IResolvableItem,
  IResolvableItemAdditionalInfo,
} from "../../../../../interfaces/ActionService/IResolvableItem";
import {MissingLeaderError} from "../../../Errors/MissingLeaderError";

export abstract class ResolvableActionService
    implements IResolvableActionService {
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

  get renderData(): IResolvableActionServiceRenderData {
    return {
      items: this._items.map((item) => item.renderData),
      action: this._action,
      finished: this.finished,
    };
  }

  //------------------------------------------

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

  // -----------------------------------------

  getItem(droppableId: string) {
    const item = this._items.find((it) => it.droppableId === droppableId);
    if (!item) {
      throw new Error("Couldn't find item with droppableId: " + droppableId);
    }
    return item;
  }

  protected updateFinished() {
    this.finished = !this._items.some(
        (item) => item.status === RESOLVE_ITEM_STATUS.PENDING
    );
  }

  resolveItem(droppableId: string) {
    throw new Error("resolveItem not implemented");
  }

  public updateItems() {
    const slots =
        this._game.actionSlotsService.slotsOccupiedAndCategorized[this._action];

    const items = new Map<string, IResolvableItem>();
    slots.forEach((value, key) => {
      // removing LEADER/HELPER-ID information
      const id = ActionSlotsService.rmvRoleInfoFromDroppableId(key);
      const additionalInfo: IResolvableItemAdditionalInfo = {};
      if (key.includes("gather")) {
        additionalInfo.resource = key.split("-")[3] as "left" | "right";
      }

      if (key.includes("leader")) {
        items.set(
            id,
            new ResolvableItem(
                key,
                value,
                getItemFromDroppableId(key, this._game),
                additionalInfo,
                this._action
            )
        );
      }
    });
    slots.forEach((value, key) => {
      if (key.includes("helper")) {
        const id = ActionSlotsService.rmvRoleInfoFromDroppableId(key);
        const itemName = id.split("-")[1];
        const itemType = key.split("-")[0];
        const item = items.get(id);
        if (!item) {
          if (itemType !== "threat") {
            throw new MissingLeaderError(
                "Can't find item with assigned helper",
                itemName,
                itemType
            );
          }
        } else {
          item.incrementHelpers();
        }
      }
    });

    this._items = Array.from(items, ([key, value]) => value);
    this.finished = this._items.length === 0;
  }

  clearItems() {
    this._items = [];
  }
}
