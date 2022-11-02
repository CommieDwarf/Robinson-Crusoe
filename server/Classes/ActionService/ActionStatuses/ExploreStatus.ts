import { ActionStatus } from "./ActionStatus/ActionStatus";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/ActionStatus";
import { TilesService } from "../../Tiles/TileService";

export class ExploreStatus extends ActionStatus {
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
      // TODO: implement ROLL DICE
      if (!item.leader || item.helpers < 1) {
        throw new Error("need more pawns");
      }
      const tileId = TilesService.getTileIdFromDroppableId(item.name);
      this._game.tilesService.explore(tileId);
      item.status = RESOLVE_ITEM_STATUS.SUCCESS;
    }
  }
}
