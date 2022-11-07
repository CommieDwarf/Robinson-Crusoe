import { ResolvableActionService } from "./ResolvableActionService/ResolvableActionService";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/IActionResolvableService";
import { TilesService } from "../../Tiles/TileService";
import { ITile } from "../../../../interfaces/Tiles/Tile";
import { Action } from "../../../../interfaces/Action";

export class GatherStatus extends ResolvableActionService {
  protected _action: Action = "gather";

  constructor(game: IGame) {
    super(game);
  }

  resolveNextItem() {
    super.resolveNextItem();
    const item = this._items.shift();
    if (item) {
      const tile = item.type as ITile;
      // TODO: implement ROLL DICE
      if (!item.leader || item.helpers < 1) {
        throw new Error("need more pawns");
      }
      const tileId = TilesService.getTileIdFromDroppableId(item.droppableId);
      const side = item.droppableId[3] as "left" | "right";

      this._game.tilesService.gather(side, tileId);
      item.status = RESOLVE_ITEM_STATUS.SUCCESS;
    }
  }
}
