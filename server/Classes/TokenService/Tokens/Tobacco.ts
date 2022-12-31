import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { DISCOVERY_TOKEN } from "../../../../interfaces/TokenService/Token";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";
import { ICharacter } from "../../../../interfaces/Characters/Character";

export class Tobacco extends Token {
  constructor(game: IGame) {
    super(game, DISCOVERY_TOKEN.TOBACCO, "Otrzymujesz +1 do morali.");
  }

  use(user: IPlayerCharacter, target: ICharacter | null = null) {
    super.use(user);
    this._game.moraleService.lvlUp(1, this._sourceLog);
  }

  autoDiscard() {}
}
