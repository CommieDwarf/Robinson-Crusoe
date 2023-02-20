import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class Sting extends BuildAdventureCard implements IAdventureCard {
  protected _eventNamePL = "dreszcze";

  constructor(game: IGame) {
    super(ADVENTURE_CARD_BUILD.STING, "użądlenie", false, game, "shuffle", "");
  }

  option1() {
    //TODO: set wound
  }

  triggerEffect() {
    //TODO: implement
  }
}
