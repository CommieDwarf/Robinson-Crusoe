import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class VisitOfAPredator
  extends BuildAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "nocna wizyta";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.UNMOTIVATED,
      "wizyta bestii",
      false,
      game,
      "shuffle",
      ""
    );
  }

  option1() {
    this._game.resourceService.spendResourceOrGetHurt("food", 1, this._namePL);
    this.shuffleIntoEventDeck();
  }

  triggerEffect() {
    //TODO: implement throw animals weather dice.
  }
}
