import { ResolvableActionService } from "./ResolvableActionService/ResolvableActionService";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/IActionResolvableService";
import { TilesService } from "../../Tiles/TileService";
import { ITile } from "../../../../interfaces/Tiles/Tile";
import { Action } from "../../../../interfaces/Action";

export class GatherService extends ResolvableActionService {
  protected _action: Action = "gather";

  constructor(game: IGame) {
    super(game);
  }

  resolveItem(droppableId: string) {
    const item = this.getItem(droppableId);
    const side = item.droppableId.split("-")[3] as "left" | "right";
    const tile = item.content as unknown as ITile;
    console.log(side, tile.id);
    this._game.tilesService.gather(side, tile.id, item.leader.character.namePL);
    item.status = RESOLVE_ITEM_STATUS.SUCCESS;
    this.updateFinished();
  }
}
