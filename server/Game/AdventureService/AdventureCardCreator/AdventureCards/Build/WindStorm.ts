import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class WindStorm extends BuildAdventureCard implements IAdventureCard {
  protected _eventNamePL = "naturalna palisada";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.WIND_STORM,
      "wichura",
      false,
      game,
      "shuffle",
      ""
    );
  }

  option1(resolver: ICharacter) {
    this._game.constructionService.lvlDownOrSuffer(
      CONSTRUCTION.PALISADE,
      1,
      this._namePL
    );
    this.shuffleIntoEventDeck();
  }

  triggerEventEffect() {
    if (this._game.constructionService.isBuilt(CONSTRUCTION.SHELTER)) {
      this._game.constructionService.lvlUpConstruction(
        CONSTRUCTION.PALISADE,
        1,
        this._eventNamePL
      );
    }
  }
}
