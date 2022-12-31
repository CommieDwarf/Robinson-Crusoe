import { SpecificActionService } from "./SpecificActionService/SpecificActionService";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/IActionResolvableService";
import { TileService } from "../../TileService/TileService";
import { ACTION } from "../../../../interfaces/ACTION";

export class ExploreService extends SpecificActionService {
  protected _action: ACTION = ACTION.EXPLORE;

  constructor(game: IGame) {
    super(game);
  }

  resolveItem(droppableId: string) {
    super.resolveItem(droppableId);
    const item = this.getItem(droppableId);
    if (item.status !== RESOLVE_ITEM_STATUS.FAILURE) {
      const tileId = TileService.getTileIdFromDroppableId(item.droppableId);
      this._game.tileService.explore(tileId);
      item.status = RESOLVE_ITEM_STATUS.SUCCESS;
      this.updateFinished();
    }
  }
}
