import {ActionStatus} from "./ActionStatus/ActionStatus";
import {IGame} from "../../../../interfaces/Game";
import {RESOLVE_ITEM_STATUS} from "../../../../interfaces/ActionService/ActionStatus";
import {Action} from "../../../../interfaces/Action";

export class RestStatus extends ActionStatus {
  public get action() {
    return this._action;
  }

  protected _action: Action = "rest";

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
