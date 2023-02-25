import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class GoldCoin extends GatherAdventureCard implements IAdventureCard {
  protected _eventNamePL = "przeklęta moneta";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_GATHER.GOLD_COIN,
      "złota moneta!",
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
    //TODO: put reRoll token
  }
}
