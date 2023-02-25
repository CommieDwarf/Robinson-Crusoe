import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class RemainsOfASettlement
  extends ExploreAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "epidemia";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_EXPLORE.REMAINS_OF_A_SETTLEMENT,
      "pozostałości osady",
      true,
      game,
      "discard",
      "shuffle"
    );
  }

  option1(resolver: ICharacter) {}

  option2(resolver: ICharacter) {
    this.startDrawingMysteryCards(0, 1, 2, resolver);
    this.shuffleIntoEventDeck();
  }

  triggerEventEffect() {
    this._game.characterService.hurtAllPlayerCharacters(1, this._eventNamePL);
  }
}
