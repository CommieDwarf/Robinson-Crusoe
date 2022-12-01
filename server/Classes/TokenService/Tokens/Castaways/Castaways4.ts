import { Token } from "../../Token";
import { IGame } from "../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";

export class Castaways4 extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(game, character, "castaways4", "Daje 3 żetony determinacji.");
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
