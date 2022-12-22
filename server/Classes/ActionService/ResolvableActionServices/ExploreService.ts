import { ResolvableActionService } from "./ResolvableActionService/ResolvableActionService";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/IActionResolvableService";
import { TileService } from "../../TileService/TileService";
import { Action } from "../../../../interfaces/Action";

export class ExploreService extends ResolvableActionService {
  protected _action: Action = "explore";

  constructor(game: IGame) {
    super(game);
  }

  resolveItem(droppableId: string) {
    super.resolveItem(droppableId);
    const item = this.getItem(droppableId);
    if (item.status !== RESOLVE_ITEM_STATUS.FAILURE) {
      const tileId = TileService.getTileIdFromDroppableId(item.droppableId);
      this._game.tilesService.explore(tileId);
      item.status = RESOLVE_ITEM_STATUS.SUCCESS;
      this.updateFinished();
    }
  }
}
