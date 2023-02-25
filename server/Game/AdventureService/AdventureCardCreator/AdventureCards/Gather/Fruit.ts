import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Fruit extends GatherAdventureCard implements IAdventureCard {
  protected _eventNamePL = "ból brzucha";

  constructor(game: IGame) {
    super(ADVENTURE_CARD_GATHER.FRUIT, "owoce", false, game, "shuffle", "");
  }

  option1(resolver: ICharacter) {
    //TODO: put wound
    this.shuffleIntoEventDeck();
  }

  triggerEventEffect() {
    //TODO: implement
  }
}
