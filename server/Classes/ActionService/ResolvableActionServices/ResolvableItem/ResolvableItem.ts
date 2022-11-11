import {RESOLVE_ITEM_STATUS} from "../../../../../interfaces/ActionService/IActionResolvableService";
import {IPawn} from "../../../../../interfaces/Pawns/Pawn";
import {Action} from "../../../../../interfaces/Action";
import {
  IResolvableItem,
  IResolvableItemAdditionalInfo,
  IResolvableItemContent,
  IResolvableItemRenderData,
} from "../../../../../interfaces/ActionService/IResolvableItem";

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

  constructor(
      droppableId: string,
      leader: IPawn,
      content: IResolvableItemContent,
      additionalInfo: IResolvableItemAdditionalInfo,
      action: Action
  ) {
    this._droppableId = droppableId;
    this._leader = leader;
    this._content = content;
    this._additionalInfo = additionalInfo;
    this._action = action;
  }

  get renderData(): IResolvableItemRenderData {
    return {
      droppableId: this.droppableId,
      status: this.status,
      leader: this._leader.renderData,
      content: this._content.renderData,
      additionalInfo: this._additionalInfo,
      action: this._action,
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

  incrementHelpers() {
    this._helpers++;
  }

  resolveItem(droppableId: string) {
  }

}
