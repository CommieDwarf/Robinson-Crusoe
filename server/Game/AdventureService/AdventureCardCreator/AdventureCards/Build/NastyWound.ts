import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class NastyWound extends BuildAdventureCard implements IAdventureCard {
  protected _eventNamePL = "zakażenie";

  constructor(game: IGame) {
    super(ADVENTURE_CARD_BUILD.NASTY_WOUND, "paskudna rana", false, game);
  }

  option1() {
    //TODO: set wound
    this.shuffleIntoEventDeck();
  }

  eventEffect() {
    //TODO: implement
  }
}
