import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { DISCOVERY_TOKEN } from "../../../../interfaces/TokenService/Token";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";
import { IPlayerCharacter } from "../../../../interfaces/Characters/Character";

export class LargeLeaves extends Token {
  constructor(game: IGame) {
    super(
      game,
      DISCOVERY_TOKEN.LARGE_LEAVES,
      "Odejmij jedną deszczową chmurę."
    );
  }

  use(user: IPlayerCharacter, target: IPlayerCharacter | null = null) {
    if (this._game.phaseService.phase === "weather") {
      super.use(user);
      this._game.weatherService.incrementModifier("rain", -1, this._sourceLog);
      this._used = true;
    }
  }

  autoDiscard() {}
}
