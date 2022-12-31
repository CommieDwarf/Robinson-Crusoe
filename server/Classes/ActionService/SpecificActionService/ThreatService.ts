import { SpecificActionService } from "./SpecificActionService/SpecificActionService";
import { ACTION } from "../../../../interfaces/ACTION";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/IActionResolvableService";

export class ThreatService extends SpecificActionService {
  protected _action: ACTION = ACTION.THREAT;
  public get action() {
    return this._action;
  }

  constructor(game: IGame) {
    super(game);
  }

  resolveItem(droppableId: string) {
    super.resolveItem(droppableId);
    const item = this.getItem(droppableId);
    const threatCard = this._game.eventService.getCardSlotByDroppableId(
      item.droppableId
    );
    this._game.eventService.fullFill(threatCard.id);
    item.status = RESOLVE_ITEM_STATUS.SUCCESS;
    this.updateFinished();
  }
}
