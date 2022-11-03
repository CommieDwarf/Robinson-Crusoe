import {
  IResolvableItem,
  IResolvableItemRenderData,
  IResolvableItemType,
  RESOLVE_ITEM_STATUS,
} from "../../../../../interfaces/ActionService/ActionStatus";
import { IPawn } from "../../../../../interfaces/Pawns/Pawn";
import { IEventCard } from "../../../../../interfaces/Threat/EventCard";
import { IInvention } from "../../../../../interfaces/Inventions/Invention";

export class ResolvableItem implements IResolvableItem {
  private readonly _droppableId: string;
  private readonly _leader: IPawn;
  private readonly _type: IResolvableItemType;
  private _status: RESOLVE_ITEM_STATUS = RESOLVE_ITEM_STATUS.PENDING;
  private _helpers: number = 0;

  constructor(droppableId: string, leader: IPawn, type: IResolvableItemType) {
    this._droppableId = droppableId;
    this._leader = leader;
    this._type = type;
  }

  get renderData(): IResolvableItemRenderData {
    return {
      droppableId: this.droppableId,
      status: this.status,
      leader: this._leader.renderData,
      type: this._type.renderData,
    };
  }

  get droppableId(): string {
    return this._droppableId;
  }

  get type(): IResolvableItemType {
    return this._type;
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
}
