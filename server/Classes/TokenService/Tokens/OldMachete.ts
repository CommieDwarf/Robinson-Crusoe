import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";

export class OldMachete extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(game, character, "oldMachete", "Otrzymujesz +1 do broni");
  }

  use() {
    this._game.structuresService.lvlUpStruct("weapon", 1, this._sourceLog);
    this._used = true;
  }

  autoDiscard() {}
}
