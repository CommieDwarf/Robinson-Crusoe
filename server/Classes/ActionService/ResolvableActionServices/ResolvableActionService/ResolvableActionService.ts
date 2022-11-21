import {
  IResolvableActionService,
  IResolvableActionServiceRenderData,
  RESOLVE_ITEM_STATUS,
} from "../../../../../interfaces/ActionService/IActionResolvableService";
import { Action } from "../../../../../interfaces/Action";
import { IGame } from "../../../../../interfaces/Game";
import { ResolvableItem } from "../ResolvableItem/ResolvableItem";
import { getItemFromDroppableId } from "../../../../../utils/getItemFromDroppableId";
import { ActionSlotsService } from "../../../ActionSlotsService/ActionSlots";
import {
  IResolvableItem,
  IResolvableItemAdditionalInfo,
} from "../../../../../interfaces/ActionService/IResolvableItem";
import { MissingLeaderError } from "../../../Errors/MissingLeaderError";
import {
  ActionDice,
  DiceActionType,
} from "../../../../../interfaces/RollDice/RollDice";
import { MissingPawnError } from "../../../Errors/MissingPawnError";

const diceRollableActions = ["gather", "build", "explore"];

export abstract class ResolvableActionService
  implements IResolvableActionService
{
  protected _eventToken = false;
  protected _reRollToken = false;
  private _helperAmountRequired = 0;
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

  get helperAmountRequired(): number {
    return this._helperAmountRequired;
  }

  set helperAmountRequired(value: number) {
    this._helperAmountRequired = value;
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
    const item = this.getItem(droppableId);
    this._game.actionService.lastResolvedItem = item;
    if (
      item.helpers < this.helperAmountRequired + 1 &&
      diceRollableActions.includes(this.action)
    ) {
      // TODO: implement reRoll option
      item.rollAllDices(this._action as DiceActionType);
      item.applyRollDiceEffects();
    }
    this.updateFinished();
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
            this._action,
            this._game
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

    if (this.helperAmountRequired > 0) {
      items.forEach((item, key) => {
        let itemName: string | number = key.split("-")[1];
        console.log(itemName);
        let itemType = key.split("-")[0];
        if (itemType === "tile") {
          itemName = parseInt(itemName);
        }
        if (!item.leader || item.helpers < this.helperAmountRequired) {
          throw new MissingPawnError(
            "Action requires more pawns",
            itemName,
            itemType
          );
        }
      });
    }

    this._items = Array.from(items, ([key, value]) => value);
    this.finished = this._items.length === 0;
  }

  clearItems() {
    this._items = [];
  }
}
