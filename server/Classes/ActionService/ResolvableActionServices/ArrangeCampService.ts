import { ResolvableActionService } from "./ResolvableActionService/ResolvableActionService";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/IActionResolvableService";
import { Action } from "../../../../interfaces/Action";

export class ArrangeCampService extends ResolvableActionService {
  protected _action: Action = "arrangeCamp";

  constructor(game: IGame) {
    super(game);
  }

  resolveItem(droppableId: string) {
    super.resolveItem(droppableId);
    const item = this.getItem(droppableId);
    this._game.morale.lvlUp(1, "Sprzątanie obozu");
    this._game.characterService.incrDetermination(
      item.leader.character,
      2,
      "Sprzątanie obozu"
    );
    item.status = RESOLVE_ITEM_STATUS.SUCCESS;
    this.updateFinished();
  }
}
