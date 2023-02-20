import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class UnexpectedDiscovery
  extends GatherAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_GATHER.UNEXPECTED_DISCOVERY,
      "niespodziewane znalezisko",
      false,
      game,
      "discard",
      ""
    );
  }

  option1() {
    //TODO pull a discovery token
  }
}
