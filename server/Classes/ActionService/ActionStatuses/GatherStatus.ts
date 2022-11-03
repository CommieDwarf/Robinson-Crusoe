import {ActionStatus} from "./ActionStatus/ActionStatus";
import {IGame} from "../../../../interfaces/Game";
import {RESOLVE_ITEM_STATUS} from "../../../../interfaces/ActionService/ActionStatus";
import {TilesService} from "../../Tiles/TileService";
import {ITile} from "../../../../interfaces/Tiles/Tile";

export class GatherStatus extends ActionStatus {
  public get action() {
    return this._action;
  }

  constructor(game: IGame) {
    super(game);
  }

  resolveNextItem() {
    super.resolveNextItem();
    const item = this._items.shift()
    if (item) {
      const tile = item.item as ITile;
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
