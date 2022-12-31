import { SpecificActionService } from "./SpecificActionService/SpecificActionService";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/IActionResolvableService";
import { ACTION } from "../../../../interfaces/ACTION";

export class ArrangeCampService extends SpecificActionService<ACTION.ARRANGE_CAMP> {
  protected _action: ACTION = ACTION.ARRANGE_CAMP;

  constructor(game: IGame) {
    super(game);
  }

  resolveItem(droppableId: string) {
    super.resolveItem(droppableId);
    const item = this.getItem(droppableId);
    this._game.moraleService.lvlUp(1, "Sprzątanie obozu");
    this._game.characterService.incrDetermination(
      item.leader.character,
      2,
      "Sprzątanie obozu"
    );
    item.status = RESOLVE_ITEM_STATUS.SUCCESS;
    this.updateFinished();
  }
}
