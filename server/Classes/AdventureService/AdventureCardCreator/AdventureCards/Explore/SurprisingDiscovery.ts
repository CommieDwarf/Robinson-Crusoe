import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class SurprisingDiscovery
  extends ExploreAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_EXPLORE.SURPRISING_DISCOVERY,
      "zaskakujące znalezisko",
      false,
      game
    );
  }

  option1() {
    //TODO: keep card with temporary +3 weapon usage.
  }
}
