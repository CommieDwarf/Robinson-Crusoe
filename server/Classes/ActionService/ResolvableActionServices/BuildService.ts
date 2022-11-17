import { ResolvableActionService } from "./ResolvableActionService/ResolvableActionService";
import { Action } from "../../../../interfaces/Action";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/IActionResolvableService";
import { InventionName } from "../../../../interfaces/Inventions/Inventions";
import { StructureName } from "../../../../interfaces/Structures/Structures";
import { ICharacter } from "../../../../interfaces/Characters/Character";

export class BuildService extends ResolvableActionService {
  protected _action: Action = "build";

  constructor(game: IGame) {
    super(game);
  }

  resolveItem(droppableId: string) {
    this._game.actionService.lastResolvedItem = this.getItem(droppableId);
    const item = this.getItem(droppableId);
    if (item.helpers < this.helperAmountRequired + 1) {
      // TODO: implement reRoll option
      item.rollAllDices("build");
      item.applyRollDiceEffects();
      if (item.status === RESOLVE_ITEM_STATUS.FAILURE) {
        return;
      }
    }

    let arrDroppable = item.droppableId.split("-");
    if (arrDroppable[0].includes("invention")) {
      this.buildInvention(
        arrDroppable[1] as InventionName,
        item.leader.character
      );
    } else {
      this.buildStruct(arrDroppable[1] as StructureName, item.leader.character);
    }
    this.updateFinished();
  }

  private buildStruct(name: StructureName, builder: ICharacter) {
    this._game.structuresService.lvlUpStruct(name, 1, builder.namePL);
  }

  private buildInvention(name: InventionName, builder: ICharacter) {
    this._game.inventionsService.build(name, builder);
  }
}
