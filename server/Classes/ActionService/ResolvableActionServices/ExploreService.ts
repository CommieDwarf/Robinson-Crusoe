import { ResolvableActionService } from "./ResolvableActionService/ResolvableActionService";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/IActionResolvableService";
import { TilesService } from "../../Tiles/TileService";
import { Action } from "../../../../interfaces/Action";

export class ExploreService extends ResolvableActionService {
  protected _action: Action = "explore";

  constructor(game: IGame) {
    super(game);
  }

  resolveItem(droppableId: string) {
    const item = this.getItem(droppableId);
    const tileId = TilesService.getTileIdFromDroppableId(item.droppableId);
    this._game.tilesService.explore(tileId);
    item.status = RESOLVE_ITEM_STATUS.SUCCESS;
    this.updateFinished();
  }
}
