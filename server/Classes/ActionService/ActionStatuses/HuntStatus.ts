import { ActionStatus } from "./ActionStatus/ActionStatus";
import { IGame } from "../../../../interfaces/Game";
import { Action } from "../../../../interfaces/Action";

export class HuntStatus extends ActionStatus {
  constructor(game: IGame) {
    super(game);
  }

  resolveNextItem() {
    super.resolveNextItem();

    const leader = this._items[0].leader;
    const helper = this._game.actionSlotsService.getPawn("hunt-helper");
    if (!leader || !helper) {
      throw new Error("There must be leader nad helper to fight the beast");
    }
    this._game.beasts.fightBeast(leader.character, helper.character);
  }
}
