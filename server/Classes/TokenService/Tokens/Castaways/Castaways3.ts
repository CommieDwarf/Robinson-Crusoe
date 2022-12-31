import { Token } from "../Token/Token";
import { IGame } from "../../../../../interfaces/Game";
import { DISCOVERY_TOKEN } from "../../../../../interfaces/TokenService/Token";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";
import { ICharacter } from "../../../../../interfaces/Characters/Character";

export class Castaways3 extends Token {
  constructor(game: IGame) {
    super(game, DISCOVERY_TOKEN.SCENARIO_3, "Daje +1 do broni ");
  }

  use(user: IPlayerCharacter, target: ICharacter | null = null) {
    this._game.constructionService.lvlUpConstruction(
      CONSTRUCTION.WEAPON,
      1,
      this._sourceLog
    );
    super.use(user);
    this._used = true;
  }

  autoDiscard() {
    return;
  }
}
