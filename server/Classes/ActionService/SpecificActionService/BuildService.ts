import { SpecificActionService } from "./SpecificActionService/SpecificActionService";
import { ACTION } from "../../../../interfaces/ACTION";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/IActionResolvableService";
import { ICharacter } from "../../../../interfaces/Characters/Character";
import { INVENTION } from "../../../../interfaces/InventionService/Invention";
import { CONSTRUCTION } from "../../../../interfaces/ConstructionService/Construction";

export class BuildService extends SpecificActionService<ACTION.BUILD> {
  protected _action: ACTION = ACTION.BUILD;

  constructor(game: IGame) {
    super(game);
  }

  updateItems() {
    super.updateItems();
  }

  resolveItem(droppableId: string) {
    super.resolveItem(droppableId);
    const item = this.getItem(droppableId);
    if (item.status !== RESOLVE_ITEM_STATUS.FAILURE) {
      let arrDroppable = item.droppableId.split("-");
      if (arrDroppable[0].includes("invention")) {
        this.buildInvention(
          arrDroppable[1] as INVENTION,
          item.leader.character
        );
      } else {
        this.buildConstruct(
          arrDroppable[1] as CONSTRUCTION,
          item.leader.character
        );
      }
      item.status = RESOLVE_ITEM_STATUS.SUCCESS;
      this.updateFinished();
    }
  }

  private buildConstruct(name: CONSTRUCTION, builder: ICharacter) {
    this._game.constructionService.lvlUpConstruction(name, 1, builder.namePL);
  }

  private buildInvention(name: INVENTION, builder: ICharacter) {
    this._game.inventionService.build(name, builder);
  }
}
