import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";

export class Vegetables extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(
      game,
      character,
      "vegetables",
      "jeśli masz zbudowane Naczynia, ulecz 2 rany w fazie nocy."
    );
  }

  use() {
    if (this._game.phaseService.phase === "night") {
      this._game.characterService.heal(this._character, 2, this._sourceLog);
      this._used = true;
    }
  }

  autoDiscard() {}
}
