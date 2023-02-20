import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class UnbelievableEffort
  extends GatherAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "obolałe ramiona";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_GATHER.UNBELIEVABLE_EFFORT,
      "niewiarygodny wysiłek",
      true,
      game,
      "discard",
      "shuffle"
    );
  }

  option1() {}

  option2() {
    this._game.resourceService.addResourceToOwned("wood", 2, this._namePL);
    //TODO: put wound.
  }

  triggerEffect() {
    //TODO: character with wound gets hurt.
    //TODO: discard wound.
  }
}
