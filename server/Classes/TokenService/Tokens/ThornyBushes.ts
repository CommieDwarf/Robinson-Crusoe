import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";

export class ThornyBushes extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(
      game,
      character,
      "thornyBushes",
      "Jeśli schronienie jest zbudowane, otrzymujesz +1 do palisady."
    );
  }

  use() {
    if (this._game.structuresService.getStruct("shelter").lvl > 0) {
      this._game.structuresService.lvlUpStruct("palisade", 1, this._sourceLog);
      this.discard();
    }
  }

  autoDiscard() {}
}
