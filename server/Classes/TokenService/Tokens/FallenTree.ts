import { Token } from "../Token";
import { IGame } from "../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";
import { HelperPawn } from "../../PawnService/Pawn/HelperPawn";

export class FallenTree extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(
      game,
      character,
      "fallenTree",
      "Otrzymujesz 1 drewno. Żeton zostanie zrealizowany automatycznie po fazie akcji."
    );
  }

  use() {
    this._game.allResources.addResourceToFuture("wood", 1, this._sourceLog);
    this.discard();
  }

  autoDiscard() {
    if (this._game.phaseService.phase === "weather") {
      this._game.allResources.addResourceToOwned(
        "wood",
        1,
        "Żeton: " + this._namePL
      );
      this.discard();
    }
  }
}
