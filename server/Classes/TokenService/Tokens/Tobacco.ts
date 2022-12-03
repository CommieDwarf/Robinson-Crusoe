import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";

export class Tobacco extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(game, character, "tobacco", "Otrzymujesz +1 do morali.");
  }

  use() {
    this._game.morale.lvlUp(1, this._sourceLog);
  }

  autoDiscard() {}
}
