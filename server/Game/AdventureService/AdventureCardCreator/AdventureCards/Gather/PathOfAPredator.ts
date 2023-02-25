import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class PathOfAPredator
  extends GatherAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "atak bestii";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_GATHER.PATH_OF_A_PREDATOR,
      "ścieżka drapieżnika",
      false,
      game,
      "shuffle",
      ""
    );
  }

  option1(resolver: ICharacter) {
    this.shuffleIntoEventDeck();
  }

  triggerEventEffect() {
    //TODO: set beast dice to weather.
  }
}
