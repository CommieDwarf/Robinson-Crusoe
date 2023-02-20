import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class ComingToTerms
  extends BuildAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "brak pomysłów";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.COMING_TO_TERMS,
      "realna ocena sytuacji",
      false,
      game,
      "shuffle",
      ""
    );
  }

  option1() {
    //TODO: implement discarding inventions.
    this.shuffleIntoEventDeck();
  }

  triggerEffect() {
    this._game.moraleService.lvlDown(1, this._eventNamePL);
  }
}
