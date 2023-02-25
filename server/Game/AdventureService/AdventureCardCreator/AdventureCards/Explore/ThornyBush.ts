import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class ThornyBush extends ExploreAdventureCard implements IAdventureCard {
  protected _eventNamePL = "spuchnięte ramię";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_EXPLORE.THORNY_BUSH,
      "kolczasty krzew",
      false,
      game,
      "shuffle",
      ""
    );
  }

  option1(resolver: ICharacter) {
    //TODO: implement wound
    this.shuffleIntoEventDeck();
  }

  triggerEventEffect() {
    //TODO: implement
  }
}
