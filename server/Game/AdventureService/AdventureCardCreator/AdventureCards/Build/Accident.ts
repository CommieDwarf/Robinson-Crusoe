import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

//TODO: unimplemented.
export class Accident extends BuildAdventureCard implements IAdventureCard {
  protected _eventNamePL = "gangrena";

  constructor(game: IGame) {
    super(ADVENTURE_CARD_BUILD.ACCIDENT, "wypadek", false, game, "shuffle", "");
  }

  option1(resolver: ICharacter) {
    //TODO: implement wound
    this.shuffleIntoEventDeck();
  }
}
