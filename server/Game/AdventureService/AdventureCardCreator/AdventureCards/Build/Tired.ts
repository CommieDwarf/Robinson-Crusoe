import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class Tired extends BuildAdventureCard implements IAdventureCard {
  protected _eventNamePL = "spór";

  constructor(game: IGame) {
    super(ADVENTURE_CARD_BUILD.TIRED, "wyczerpany", true, game);
  }

  option1() {}

  option2() {
    this._game.characterService.heal(this.getPrimeCharacter(), 2, this.namePL);
    this.shuffleIntoEventDeck();
  }

  eventEffect() {
    this._game.moraleService.lvlDown(1, this._eventNamePL);
  }
}
