import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";

export class AfterTheHurricane
  extends GatherAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "kolejny huragan";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_GATHER.AFTER_THE_HURRICANE,
      "po huraganie",
      false,
      game
    );
  }

  option1() {
    this._game.resourceService.addResourceToOwned("wood", 2, this._namePL);
    //TODO: put additional helper pawn at the tile.
  }

  eventEffect() {
    //TODO: make the tile unavailable.
  }
}
