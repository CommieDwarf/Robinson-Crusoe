import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class RuinedHut extends ExploreAdventureCard implements IAdventureCard {
  protected _eventNamePL = "niespokojne sny";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_EXPLORE.RUINED_HUT,
      "zniszczona chatka",
      true,
      game,
      "discard",
      "shuffle"
    );
  }

  option1() {}

  option2() {
    //TODO: implement free invention build (knife, rope, shovel or medicine)
    this.shuffleIntoEventDeck();
  }

  triggerEffect() {
    this._game.moraleService.lvlDown(1, this._eventNamePL);
  }
}
