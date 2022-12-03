import { Token } from "../Token/Token";
import { IGame } from "../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";
import { WrongPhaseError } from "../../../Errors/WrongPhaseError";

export class Castaways2 extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(game, character, "scenario2", "2 drewna tylko do odłożenia na stos.");
  }

  //TODO: implement usage. Implement scenario stash.
  use() {}

  autoDiscard() {}
}
