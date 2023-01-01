import { IActionService } from "../../../interfaces/ActionService/ActionService";
import { IGame } from "../../../interfaces/Game";

import { ACTION } from "../../../interfaces/ACTION";
import { IResolvableItem } from "../../../interfaces/ActionService/IResolvableItem";
import { getItemFromDroppableId } from "../../../utils/getItemFromDroppableId";
import { ResolvableItem } from "./ResolvableItem";
import { actionOrder } from "../../../constants/actionOrder";
import { EventCard } from "../EventService/EventCardCreator/EventCard";
import { Beast } from "../BeastService/BeastCreator/Beast";
import { RollDiceService } from "../RollDiceService/RollDiceService";
import { ActionDiceResults } from "../../../interfaces/RollDice/RollDice";
import { IPawn } from "../../../interfaces/Pawns/Pawn";

export class ActionService implements IActionService {
  private readonly _game: IGame;
  private _resolvableItems: IResolvableItem[] = [];
  private _action: ACTION = ACTION.THREAT;
  private _actionIndex = 0;
  private _finished: boolean = false;
  private _occupiedSlots: Map<string, IPawn> = new Map();
  private _rollDiceResult: ActionDiceResults | null = null;

  constructor(game: IGame) {
    this._game = game;
  }

  get resolvableItems(): IResolvableItem[] {
    return this._resolvableItems;
  }

  get action(): ACTION {
    return this._action;
  }

  get finished(): boolean {
    return this._finished;
  }

  public setNextAction() {
    if (this._resolvableItems.some((item) => !item.resolved)) {
      return;
    }
    this._rollDiceResult = null;
    this._actionIndex++;
    if (actionOrder.length - 1 < this._actionIndex) {
      this._action = actionOrder[this._actionIndex];
      this.loadItems();
    } else {
      this._finished = true;
      this._action = actionOrder[0];
      this._actionIndex = 0;
      this._resolvableItems = [];
    }
  }

  public loadItems() {
    this._occupiedSlots =
      this._game.actionSlotService.slotsOccupiedAndCategorized[this._action];
    const resolvableItems: IResolvableItem[] = [];
    this._occupiedSlots.forEach((pawn, droppableID) => {
      const item = getItemFromDroppableId(droppableID, this._game);
      resolvableItems.push(
        new ResolvableItem(item, this._action, pawn, this._game, droppableID)
      );
    });

    this._resolvableItems = resolvableItems;
  }

  public resolve(resolvableItemID: string) {
    const resolvableItem = this.getResolvableItem(resolvableItemID);
    const shouldRollDices = this.shouldRollDices(resolvableItem);
    const action = resolvableItem.action;
    if (
      (shouldRollDices &&
        !resolvableItem.rolled &&
        action === ACTION.EXPLORE) ||
      action === ACTION.BUILD ||
      action === ACTION.GATHER
    ) {
      this._rollDiceResult = RollDiceService.getActionRollDiceResults(action);
      resolvableItem.rolled = true;
      this.applyRollDiceEffects(resolvableItem);
    } else {
      resolvableItem.resolve();
    }
  }

  private applyRollDiceEffects(resolvableItem: IResolvableItem) {
    const character = resolvableItem.leaderPawn.character;
    if (this._rollDiceResult?.hurt.result === "hurt") {
      this._game.characterService.hurt(character, 1, this._action);
    }
    if (this._rollDiceResult?.success.result === "success") {
      resolvableItem.resolve();
    } else {
      this._game.characterService.incrDetermination(character, 2, this._action);
    }
    if (this._rollDiceResult?.mystery.result === "mystery") {
      //TODO: pull mystery card.
    }
  }

  private getResolvableItem(id: string) {
    const resolvableItem = this._resolvableItems.find((item) => item.id == id);
    if (!resolvableItem) {
      throw new Error(`Resolvable item with id: ${id} not found.`);
    }

    return resolvableItem;
  }

  private shouldRollDices(resolvableItem: IResolvableItem) {
    const item = resolvableItem.item;
    if (
      item === ACTION.REST ||
      item === ACTION.ARRANGE_CAMP ||
      item instanceof EventCard ||
      item instanceof Beast
    ) {
      return false;
    }
    return (
      item.requiredHelperAmount >=
      this.getHelperAmount(resolvableItem.droppableID)
    );
  }

  private getHelperAmount(droppableID: string): number {
    let helperAmount = 0;
    const droppableIDWithoutRole = droppableID.slice(0, -8);
    if (this._occupiedSlots) {
      this._occupiedSlots.forEach((pawn, dropID) => {
        if (
          dropID.includes(droppableIDWithoutRole) &&
          dropID.includes("helper")
        ) {
          helperAmount++;
        }
      });
    }

    return helperAmount;
  }
}
