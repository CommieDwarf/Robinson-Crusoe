import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class NiceSurprise
  extends GatherAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "zapadnięty dach";

  constructor(game: IGame) {
    super(ADVENTURE_CARD_GATHER.NICE_SURPRISE, "okazja", true, game);
  }

  option1() {}

  option2() {
    this._game.resourceService.addResourceToOwned("wood", 3, this._namePL);
  }

  eventEffect() {
    this._game.constructionService.setDividedLvlByTwo(
      CONSTRUCTION.ROOF,
      this._eventNamePL
    );
  }
}
