import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { DISCOVERY_TOKEN } from "../../../../interfaces/TokenService/Token";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";
import { ICharacter } from "../../../../interfaces/Characters/Character";

export class FallenTree extends Token {
  constructor(game: IGame) {
    super(
      game,
      DISCOVERY_TOKEN.FALLEN_TREE,
      "Otrzymujesz 1 drewno. Żeton zostanie zrealizowany automatycznie po fazie akcji."
    );
  }

  use(user: IPlayerCharacter, target: ICharacter | null = null) {
    this._game.resourceService.addResourceToFuture("wood", 1, this._sourceLog);
    this._used = true;
    super.use(user);
  }

  autoDiscard() {
    if (this._game.phaseService.phase === "weather") {
      this._game.resourceService.addResourceToOwned("wood", 1, this._sourceLog);
      this._used = true;
      super.autoDiscard();
    }
  }
}
