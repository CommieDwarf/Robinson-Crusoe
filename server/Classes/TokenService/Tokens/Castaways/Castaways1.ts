import { Token } from "../Token/Token";
import { IGame } from "../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";
import { ICharacter } from "../../../../../interfaces/Characters/Character";
import { DISCOVERY_TOKEN } from "../../../../../interfaces/TokenService/Token";

export class Castaways1 extends Token {
  constructor(game: IGame) {
    super(game, DISCOVERY_TOKEN.SCENARIO_1, "Leczy 1 ranę w nocy.");
  }

  use(user: IPlayerCharacter, target: ICharacter | null) {
    if (!target) {
      throw new Error("No target specified");
    }
    if (this._game.phaseService.phase === "night") {
      this._game.characterService.heal(target, 1, this._sourceLog);
      super.use(user);
      this._used = true;
    } else {
      this._game.alertService.setAlert(
        `${this.name}: tego żetonu można użyć tylko w nocy`
      );
    }
  }

  autoDiscard() {
    return;
  }
}
