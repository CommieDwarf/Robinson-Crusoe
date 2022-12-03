import { Token } from "../Token/Token";
import { IGame } from "../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";

export class Castaways4 extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(game, character, "scenario4", "Daje 3 żetony determinacji.");
  }

  use() {
    this._game.characterService.incrDetermination(
      this._character,
      3,
      this._sourceLog
    );
    this.discard();
  }

  autoDiscard() {}
}
