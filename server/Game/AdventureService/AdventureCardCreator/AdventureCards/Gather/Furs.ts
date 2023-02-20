import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class Furs extends GatherAdventureCard implements IAdventureCard {
  protected _eventNamePL = "insekty";

  constructor(game: IGame) {
    super(ADVENTURE_CARD_GATHER.FURS, "skóry", true, game, "discard", "");
  }

  option1() {}

  option2() {
    this._game.resourceService.addResourceToOwned("leather", 2, this._namePL);
  }

  triggerEffect() {
    //TODO: decrement 1 food in production phase if possible
  }
}
