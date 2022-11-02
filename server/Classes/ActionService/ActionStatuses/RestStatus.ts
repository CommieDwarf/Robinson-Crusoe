import { ActionStatus } from "./ActionStatus/ActionStatus";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/ActionStatus";

export class RestStatus extends ActionStatus {
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
      this._game.characterService.heal(item.leader.character, 1, "Odpoczynek");
      item.status = RESOLVE_ITEM_STATUS.SUCCESS;
    }
  }
}
