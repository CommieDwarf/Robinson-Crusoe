import { ActionStatus } from "./ActionStatus/ActionStatus";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/ActionStatus";

export class ArrangeCampStatus extends ActionStatus {
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
      this._game.morale.lvlUp(1, "Sprzątanie obozu");
      this._game.characterService.incrDetermination(
        item.leader.character,
        2,
        "Sprzątanie obozu"
      );
      item.status = RESOLVE_ITEM_STATUS.SUCCESS;
    }
  }
}
