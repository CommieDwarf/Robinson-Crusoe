import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class DarkCloudsInTheSky
  extends BuildAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "koniec ulewy";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.DARK_CLOUDS_IN_THE_SKY,
      "zachmurzone niebo",
      false,
      game,
      "shuffle",
      ""
    );
  }

  option1() {
    this._game.weatherService.setToken("rain", true, this.namePL);
    this.shuffleIntoEventDeck();
  }

  triggerEffect() {
    if (this._game.constructionService.isBuilt(CONSTRUCTION.SHELTER)) {
      this._game.constructionService.lvlUpConstruction(
        CONSTRUCTION.PALISADE,
        1,
        this._eventNamePL
      );
    }
  }
}
