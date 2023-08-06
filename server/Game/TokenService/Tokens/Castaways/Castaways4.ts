import { Token } from "../Token/Token";
import { IGame } from "../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/Character";
import { DISCOVERY_TOKEN } from "../../../../../interfaces/TokenService/Token";

export class Castaways4 extends Token {
  constructor(game: IGame) {
    super(game, DISCOVERY_TOKEN.SCENARIO_4, "Daje 3 żetony determinacji.");
  }

  use(user: IPlayerCharacter, target: IPlayerCharacter | null) {
    if (!target) {
      throw new Error("target not specified");
    }
    this._game.characterService.incrDetermination(target, 3, this._sourceLog);
    this._used = true;
    super.use(user);
  }

  autoDiscard() {}
}
