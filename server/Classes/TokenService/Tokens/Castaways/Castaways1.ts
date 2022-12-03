import { Token } from "../Token/Token";
import { IGame } from "../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";
import { WrongPhaseError } from "../../../Errors/WrongPhaseError";

export class Castaways1 extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(game, character, "scenario1", "Leczy 1 ranę w nocy.");
  }

  use() {
    if (this._game.phaseService.phase === "night") {
      this._game.characterService.heal(this._character, 1, this._sourceLog);
      this.discard();
    }
  }

  autoDiscard() {}
}
