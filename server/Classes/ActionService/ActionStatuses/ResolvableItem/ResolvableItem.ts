import {
  IResolvableItem, IResolvableItemRenderData,
  RESOLVE_ITEM_STATUS,
} from "../../../../../interfaces/ActionService/ActionStatus";
import {IPawn} from "../../../../../interfaces/Pawns/Pawn";

export class ResolvableItem implements IResolvableItem {


  private readonly _name: string;
  private readonly _leader: IPawn;
  private _status: RESOLVE_ITEM_STATUS = RESOLVE_ITEM_STATUS.PENDING;
  private _helpers: number = 0;

  constructor(name: string, leader: IPawn) {
    this._name = name;
    this._leader = leader;
  }

  get renderData(): IResolvableItemRenderData {
    return {
      name: this.name,
      status: this.status,
      leader: this._leader.renderData,
    }
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

  get name(): string {
    return this._name;
  }

  get status(): RESOLVE_ITEM_STATUS {
    return this._status;
  }

  incrementHelpers() {
    this._helpers++;
  }
}
