import { ResolvableActionService } from "./ResolvableActionService/ResolvableActionService";
import { Action } from "../../../../interfaces/Action";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/IActionResolvableService";

export class ThreatService extends ResolvableActionService {
  protected _action: Action = "threat";
  public get action() {
    return this._action;
  }

  constructor(game: IGame) {
    super(game);
  }

  resolveItem(droppableId: string) {
    super.resolveItem(droppableId);
    const item = this.getItem(droppableId);
    const threatCard = this._game.threat.getCardSlotByDroppableId(
      item.droppableId
    );
    this._game.threat.fullFill(
      threatCard.id,
      item.leader.character,
      item.helpers > 0
    );
    item.status = RESOLVE_ITEM_STATUS.SUCCESS;
    this.updateFinished();
  }
}
