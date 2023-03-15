import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

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
      game,
      "shuffle",
      ""
    );
  }

  option1(resolver: ICharacter) {
    this._game.resourceService.addBasicResourceToOwned("wood", 2, this._namePL);
    //TODO: put additional helper pawn at the tile.
  }

  triggerEventEffect() {
    //TODO: make the tile unavailable.
  }
}
