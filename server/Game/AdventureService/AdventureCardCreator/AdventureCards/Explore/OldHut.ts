import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class OldHut extends ExploreAdventureCard implements IAdventureCard {
  protected _eventNamePL = "duch rozbitka";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_EXPLORE.OLD_HUT,
      "stara chata",
      true,
      game,
      "discard",
      "shuffle"
    );
  }

  option1() {}

  option2() {
    //TODO: implement pulling mystery cards.
  }

  triggerEffect() {
    this._game.characterService.decrDeterminationAllPlayerCharacters(
      1,
      this._eventNamePL
    );
  }
}
