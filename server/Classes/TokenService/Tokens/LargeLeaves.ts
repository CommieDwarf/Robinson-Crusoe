import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";

export class LargeLeaves extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(game, character, "largeLeaves", "Odejmij jedną deszczową chmurę.");
  }

  use() {
    if (this._game.phaseService.phase === "weather") {
      this._game.weatherService.incrementModifier("rain", -1, this._sourceLog);
      this._used = true;
    }
  }

  autoDiscard() {}
}
