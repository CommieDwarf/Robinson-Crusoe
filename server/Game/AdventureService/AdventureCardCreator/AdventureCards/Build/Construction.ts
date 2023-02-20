import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class Construction extends BuildAdventureCard implements IAdventureCard {
  protected _eventNamePL = "mocniejsza konstrukcja";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.CONSTRUCTION,
      "konstrukcja",
      false,
      game,
      "shuffle",
      ""
    );
  }

  option1() {
    this.shuffleIntoEventDeck();
  }

  triggerEffect() {
    if (
      this._game.constructionService.getConstruction(CONSTRUCTION.SHELTER).lvl >
      0
    ) {
      this._game.constructionService.lvlUpConstruction(
        CONSTRUCTION.PALISADE,
        1,
        this._eventNamePL
      );
    }
  }
}
