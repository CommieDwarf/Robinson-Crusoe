import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class Savings extends BuildAdventureCard implements IAdventureCard {
  protected _eventNamePL = "licha konstrukcja";

  constructor(game: IGame) {
    super(ADVENTURE_CARD_BUILD.SAVINGS, "oszczędności", true, game);
  }

  option1() {}

  option2() {
    this._game.resourceService.addResourceToOwned("wood", 2, this._namePL);
    this.shuffleIntoEventDeck();
  }

  eventEffect() {
    this._game.moraleService.lvlDown(1, this._eventNamePL);
  }
}
