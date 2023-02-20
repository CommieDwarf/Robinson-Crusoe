import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class SignsOfAPredator
  extends GatherAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_GATHER.SIGNS_OF_A_PREDATOR,
      "ślady drapieżnika",
      false,
      game,
      "discard",
      ""
    );
  }

  option1() {
    //TODO place beast token on the tile
  }
}
