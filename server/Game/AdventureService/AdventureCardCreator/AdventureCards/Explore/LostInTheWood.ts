import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class LostInTheWood
  extends ExploreAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_EXPLORE.LOST_IN_THE_WOOD,
      "zagubiony w lesie",
      false,
      game,
      "discard",
      ""
    );
  }

  option1() {
    const character = this.getPrimeCharacter();
    this._game.characterService.decrDetermination(character, 2, this._namePL);
  }
}
