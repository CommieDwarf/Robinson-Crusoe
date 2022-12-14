import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";

export class Poison extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(
      game,
      character,
      "poison",
      "Jeśli masz zbudowane Naczynia, otrzymujesz +2 do broni"
    );
  }

  use() {
    if (this._game.inventionsService.getInvention("pot").isBuilt) {
      this._game.structuresService.lvlUpStruct("weapon", 2, this._sourceLog);
      this._used = true;
    }
  }

  autoDiscard() {}
}
