import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class EyesInTheBushes
  extends GatherAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "niespodziewana wizyta";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_GATHER.EYES_IN_THE_BUSHES,
      "oczy w ciemności",
      false,
      game
    );
  }

  option1() {
    this.shuffleIntoEventDeck();
  }

  eventEffect() {
    //TODO: set hungry animal in weather.
  }
}
