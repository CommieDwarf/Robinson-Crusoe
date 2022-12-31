import { SpecificActionService } from "./SpecificActionService/SpecificActionService";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/IActionResolvableService";
import { ACTION } from "../../../../interfaces/ACTION";

export class RestService extends SpecificActionService {
  public get action() {
    return this._action;
  }

  protected _action: ACTION = ACTION.REST;

  constructor(game: IGame) {
    super(game);
  }

  resolveItem(droppableId: string) {
    super.resolveItem(droppableId);
    const item = this.getItem(droppableId);
    this._game.characterService.heal(item.leader.character, 1, "Odpoczynek");
    item.status = RESOLVE_ITEM_STATUS.SUCCESS;
    this.updateFinished();
  }
}
