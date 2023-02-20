import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class CutHead extends BuildAdventureCard implements IAdventureCard {
  protected _eventNamePL = "ból głowy";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.CUT_HEAD,
      "skaleczenie",
      false,
      game,
      "shuffle",
      ""
    );
  }

  option1() {
    const character = this.getPrimeCharacter();
    this._game.characterService.incrDetermination(character, 2, this._namePL);
    this._game.characterService.hurt(character, 1, this._namePL);
    //TODO: implement wounds
    this.shuffleIntoEventDeck();
  }

  triggerEffect() {
    //todo: implement
  }
}
