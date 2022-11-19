import { RESOLVE_ITEM_STATUS } from "../../../../../interfaces/ActionService/IActionResolvableService";
import { IPawn } from "../../../../../interfaces/Pawns/Pawn";
import { Action } from "../../../../../interfaces/Action";
import {
  IResolvableItem,
  IResolvableItemAdditionalInfo,
  IResolvableItemContent,
  IResolvableItemRenderData,
} from "../../../../../interfaces/ActionService/IResolvableItem";
import { RollDiceService } from "../../../RollDiceService/RollDiceService";
import {
  ActionDice,
  ActionRollDiceInfo,
  DiceActionType,
} from "../../../../../interfaces/RollDice/RollDice";
import { IGame } from "../../../../../interfaces/Game";

export class ResolvableItem implements IResolvableItem {
  get action(): Action {
    return this._action;
  }

  get content() {
    return this._content;
  }

  get additionalInfo() {
    return this._additionalInfo;
  }

  private readonly _droppableId: string;
  private readonly _leader: IPawn;
  private _status: RESOLVE_ITEM_STATUS = RESOLVE_ITEM_STATUS.PENDING;
  private _helpers: number = 0;
  private readonly _content;
  private readonly _additionalInfo;
  private readonly _action;
  public diceRoll: null | ActionRollDiceInfo = null;
  private _game: IGame;

  constructor(
    droppableId: string,
    leader: IPawn,
    content: IResolvableItemContent,
    additionalInfo: IResolvableItemAdditionalInfo,
    action: Action,
    game: IGame
  ) {
    this._droppableId = droppableId;
    this._leader = leader;
    this._content = content;
    this._additionalInfo = additionalInfo;
    this._action = action;
    this._game = game;
  }

  get renderData(): IResolvableItemRenderData {
    return {
      droppableId: this.droppableId,
      status: this.status,
      leader: this._leader.renderData,
      content: this._content.renderData,
      additionalInfo: this._additionalInfo,
      action: this._action,
      diceRoll: this.diceRoll,
    };
  }

  get droppableId(): string {
    return this._droppableId;
  }

  get leader(): IPawn {
    return this._leader;
  }

  get helpers(): number {
    return this._helpers;
  }

  set helpers(value: number) {
    this._helpers = value;
  }

  set status(value: RESOLVE_ITEM_STATUS) {
    this._status = value;
  }

  get status(): RESOLVE_ITEM_STATUS {
    return this._status;
  }

  rollAllDices(action: DiceActionType) {
    this.diceRoll = {
      type: action,
      results: {
        hurt: RollDiceService.getRollDiceResult(action, "hurt"),
        mystery: RollDiceService.getRollDiceResult(action, "mystery"),
        success: RollDiceService.getRollDiceResult(action, "success"),
      },
    };
    console.log(this.diceRoll);
  }

  reRoll(action: DiceActionType, dice: ActionDice) {
    const diceRoll = this.diceRoll;
    if (!diceRoll) {
      throw new Error("Can't re-roll dice that hasn't been rolled");
    }
    diceRoll.results[dice] = RollDiceService.getRollDiceResult(action, dice);
  }

  public applyRollDiceEffects() {
    const characterService = this._game.characterService;
    if (this.diceRoll?.results.hurt?.result === "hurt") {
      characterService.hurt(this.leader.character, 1, "Rzut kością");
    }
    if (this.diceRoll?.results.mystery?.result === "mystery") {
      // TODO: Implement setting a proper question mark.
    }
    if (this.diceRoll?.results.success?.result === "determination") {
      characterService.incrDetermination(
        this.leader.character,
        2,
        "Rzut kością"
      );
      this.status = RESOLVE_ITEM_STATUS.FAILURE;
    } else {
      this.status = RESOLVE_ITEM_STATUS.SUCCESS;
    }
  }

  incrementHelpers() {
    this._helpers++;
  }

  resolveItem(droppableId: string) {}
}
