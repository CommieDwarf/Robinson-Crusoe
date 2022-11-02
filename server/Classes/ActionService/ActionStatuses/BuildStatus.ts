import { ActionStatus } from "./ActionStatus/ActionStatus";
import { Action } from "../../../../interfaces/Action";
import { IGame } from "../../../../interfaces/Game";
import { RESOLVE_ITEM_STATUS } from "../../../../interfaces/ActionService/ActionStatus";
import { InventionName } from "../../../../interfaces/Inventions/Inventions";
import { StructureName } from "../../../../interfaces/Structures/Structures";

export class BuildStatus extends ActionStatus {
  constructor(game: IGame) {
    super(game);
  }

  resolveNextItem() {
    super.resolveNextItem();

    const item = this._items.shift();
    if (item) {
      // TODO: implement roll dice.
      let rollDice =
        (this.additionalPawnRequired && item.helpers < 2) ||
        (!this.additionalPawnRequired && item.helpers < 1);

      let arrDroppable = item.name.split("-");

      if (arrDroppable[0].includes("invention")) {
        this.buildInvention(arrDroppable[1] as InventionName);
      } else {
        this.buildStruct(arrDroppable[1] as StructureName);
      }
    }
  }

  private buildStruct(name: StructureName) {
    this._game.structuresService.lvlUpStruct(name, 1);
  }

  private buildInvention(name: InventionName) {
    this._game.inventionsService.getInvention(name).isBuilt = true;
    this._game.inventionsService.updateLocks();
  }
}
