import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { INVENTION_STARTER } from "../../../../../../interfaces/InventionService/Invention";

export class SurpriseInTheBushes
  extends GatherAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "wspomnienia";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_GATHER.SURPRISE_IN_THE_BUSHES,
      "znalezisko w krzakach",
      true,
      game
    );
  }

  option1() {}

  option2() {
    //TODO: implement picking starting equipment item.
    //I don't think i can manage to fit extra item in the UI for now.
  }

  eventEffect() {
    this._game.moraleService.lvlDown(1, this._eventNamePL);
  }
}
