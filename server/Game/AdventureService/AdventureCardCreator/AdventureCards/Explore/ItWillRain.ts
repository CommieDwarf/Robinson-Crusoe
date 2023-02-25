import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class ItWillRain extends ExploreAdventureCard implements IAdventureCard {
  protected _eventNamePL = "oberwane chmury";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_EXPLORE.IT_WILL_RAIN,
      "niebo zaciąga się",
      false,
      game,
      "shuffle",
      ""
    );
  }

  option1(resolver: ICharacter) {
    this.shuffleIntoEventDeck();
  }

  triggerEventEffect() {
    this._game.weatherService.setToken("rain", true, this._eventNamePL);
  }
}
