import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class UnexpectedTroubles
  extends GatherAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_GATHER.UNEXPECTED_TROUBLES,
      "niespodziewane trudności",
      false,
      game,
      "discard",
      ""
    );
  }

  option1(resolver: ICharacter) {
    //TODO: treat tile's terrain type as undiscovered.
  }
}
