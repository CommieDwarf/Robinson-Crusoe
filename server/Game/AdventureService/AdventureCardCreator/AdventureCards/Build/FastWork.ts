import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class FastWork extends BuildAdventureCard implements IAdventureCard {
  protected _eventNamePL = "co nagle to po diable";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.FAST_WORK,
      "pośpiech",
      true,
      game,
      "discard",
      "shuffle"
    );
  }

  option1() {}

  option2() {
    //TODO: implement building another item + rolling dices for it
  }

  triggerEffect() {
    this._game.constructionService.lvlDownOrSuffer(
      CONSTRUCTION.PALISADE,
      1,
      this._eventNamePL
    );
  }
}
