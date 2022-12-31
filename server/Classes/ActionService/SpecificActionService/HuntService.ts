import { SpecificActionService } from "./SpecificActionService/SpecificActionService";
import { IGame } from "../../../../interfaces/Game";
import { ACTION } from "../../../../interfaces/ACTION";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/IActionResolvableService";

export class HuntStatus extends SpecificActionService {
  protected _action: ACTION = ACTION.HUNT;

  constructor(game: IGame) {
    super(game);
    this.helperAmountRequired = 1;
  }

  resolveItem(droppableId: string) {
    super.resolveItem(droppableId);
    const item = this.getItem(droppableId);
    const leader = item.leader;
    const helper = this._game.actionSlotService.getPawn("hunt-helper-1");
    if (!leader || !helper) {
      throw new Error("There must be leader nad helper to fight the beast");
    }
    this._game.beastService.fightBeast(leader.character, helper.character);
    item.status = RESOLVE_ITEM_STATUS.SUCCESS;
    this.updateFinished();
  }
}
