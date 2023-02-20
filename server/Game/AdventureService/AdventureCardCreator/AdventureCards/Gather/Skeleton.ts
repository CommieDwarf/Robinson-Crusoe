import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class Skeleton extends GatherAdventureCard implements IAdventureCard {
  protected _eventNamePL = "wspomnienia martwego odkrywcy";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_GATHER.SKELETON,
      "szkielet",
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
    //TODO: add random invention.
    this._game.moraleService.lvlUp(1, this._eventNamePL);
  }
}
