import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Savings extends BuildAdventureCard implements IAdventureCard {
  protected _eventNamePL = "licha konstrukcja";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.SAVINGS,
      "oszczędności",
      true,
      game,
      "discard",
      "shuffle"
    );
  }

  option1(resolver: ICharacter) {}

  option2(resolver: ICharacter) {
    this._game.resourceService.addBasicResourceToOwned("wood", 2, this._namePL);
    this.shuffleIntoEventDeck();
  }

  triggerEventEffect() {
    this._game.moraleService.lvlDown(1, this._eventNamePL);
  }
}
