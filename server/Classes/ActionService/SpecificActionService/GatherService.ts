import { SpecificActionService } from "./SpecificActionService/SpecificActionService";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/IActionResolvableService";
import { ITile } from "../../../../interfaces/TileService/ITile";
import { ACTION } from "../../../../interfaces/ACTION";

export class GatherService extends SpecificActionService {
  protected _action: ACTION = ACTION.GATHER;

  constructor(game: IGame) {
    super(game);
  }

  resolveItem(droppableId: string) {
    super.resolveItem(droppableId);
    const item = this.getItem(droppableId);
    if (item.status !== RESOLVE_ITEM_STATUS.FAILURE) {
      const side = item.droppableId.split("-")[3] as "left" | "right";
      const tile = item.content as unknown as ITile;
      this._game.tileService.gather(
        side,
        tile.id,
        item.leader.character.namePL
      );
      item.status = RESOLVE_ITEM_STATUS.SUCCESS;
      this.updateFinished();
    }
  }
}
