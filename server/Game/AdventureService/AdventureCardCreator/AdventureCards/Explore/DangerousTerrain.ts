import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class DangerousTerrain
  extends ExploreAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_EXPLORE.DANGEROUS_TERRAIN,
      "niebezpieczny teren",
      false,
      game,
      "discard",
      ""
    );
  }

  option1() {
    //TODO: implement beast token on tile and requirement 1 weapon or get hurt on any action on this tile.
  }
}
