import { ResolvableActionService } from "./ResolvableActionService/ResolvableActionService";
import { Action } from "../../../../interfaces/Action";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/IActionResolvableService";

export class ThreatStatus extends ResolvableActionService {
  protected _action: Action = "threat";
  public get action() {
    return this._action;
  }

  constructor(game: IGame) {
    super(game);
  }

  resolveNextItem() {
    super.resolveNextItem();
    const item = this._items.shift();
    if (item) {
      const threatCard = this._game.threat.getCardSlotByDroppableId(
        item.droppableId
      );
      threatCard.fullFill(item.leader.character);
      item.status = RESOLVE_ITEM_STATUS.SUCCESS;
    }
  }
}
