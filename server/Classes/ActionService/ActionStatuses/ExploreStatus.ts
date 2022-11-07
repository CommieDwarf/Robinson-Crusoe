import { ResolvableActionService } from "./ResolvableActionService/ResolvableActionService";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/IActionResolvableService";
import { TilesService } from "../../Tiles/TileService";
import { Action } from "../../../../interfaces/Action";

export class ExploreStatus extends ResolvableActionService {
  protected _action: Action = "explore";

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
      const tileId = TilesService.getTileIdFromDroppableId(item.droppableId);
      this._game.tilesService.explore(tileId);
      item.status = RESOLVE_ITEM_STATUS.SUCCESS;
    }
  }
}
