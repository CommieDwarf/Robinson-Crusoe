import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class OldGrave extends ExploreAdventureCard implements IAdventureCard {
  protected _eventNamePL = "wspomnienia o martwym rozbitku";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_EXPLORE.OLD_GRAVE,
      "stary grób",
      false,
      game,
      "shuffle",
      ""
    );
  }

  option1(resolver: ICharacter) {
    const character = this.getPrimeCharacter();
    this._game.characterService.decrDetermination(character, 1, this._namePL);
    this.shuffleIntoEventDeck();
  }

  triggerEventEffect() {
    const character = this.getPrimeCharacter();
    this._game.characterService.decrDetermination(
      character,
      2,
      this._eventNamePL
    );
  }
}
