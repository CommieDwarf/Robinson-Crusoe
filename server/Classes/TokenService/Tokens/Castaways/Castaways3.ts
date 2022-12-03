import { Token } from "../Token/Token";
import { IGame } from "../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";

export class Castaways3 extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(game, character, "scenario3", "Daje +1 do broni ");
  }

  use() {
    this._game.structuresService.lvlUpStruct("weapon", 1, this._sourceLog);
    this.discard();
  }

  autoDiscard() {}
}
