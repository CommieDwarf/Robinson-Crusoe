import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class WrongTrack extends ExploreAdventureCard implements IAdventureCard {
  protected _eventNamePL = "";

  constructor(game: IGame) {
    super(ADVENTURE_CARD_EXPLORE.WRONG_TRACK, "pomylone ścieżki", false, game);
  }

  option1() {
    //TODO: night out of camp
  }

  eventEffect() {
    this._game.resourceService.addResourceToOwned("wood", 2, this._eventNamePL);
  }
}
