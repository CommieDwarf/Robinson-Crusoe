import {ResolvableActionService} from "./ResolvableActionService/ResolvableActionService";
import {IGame} from "../../../../interfaces/Game";
import {Action} from "../../../../interfaces/Action";
import {RESOLVE_ITEM_STATUS} from "../../../../interfaces/ActionService/IActionResolvableService";

export class HuntStatus extends ResolvableActionService {
  protected _action: Action = "hunt";


  constructor(game: IGame) {
    super(game);
    this.helperAmountRequired = 1;
  }

  resolveItem(droppableId: string) {
    super.resolveItem(droppableId);
    const item = this.getItem(droppableId);
    const leader = item.leader;
    const helper = this._game.actionSlotsService.getPawn("hunt-helper-1");
    if (!leader || !helper) {
      throw new Error("There must be leader nad helper to fight the beast");
    }
    this._game.beasts.fightBeast(leader.character, helper.character);
    item.status = RESOLVE_ITEM_STATUS.SUCCESS;
    this.updateFinished();
  }
}
