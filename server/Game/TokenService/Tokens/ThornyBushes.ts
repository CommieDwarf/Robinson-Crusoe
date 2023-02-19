import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { CONSTRUCTION } from "../../../../interfaces/ConstructionService/Construction";
import { DISCOVERY_TOKEN } from "../../../../interfaces/TokenService/Token";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";
import { ICharacter } from "../../../../interfaces/Characters/Character";

export class ThornyBushes extends Token {
  constructor(game: IGame) {
    super(
      game,
      DISCOVERY_TOKEN.THORNY_BUSHES,
      "Jeśli schronienie jest zbudowane, otrzymujesz +1 do palisady."
    );
  }

  use(user: IPlayerCharacter, target: ICharacter | null = null) {
    if (
      this._game.constructionService.getConstruction(CONSTRUCTION.SHELTER).lvl >
      0
    ) {
      super.use(user);
      this._game.constructionService.lvlUpConstruction(
        CONSTRUCTION.PALISADE,
        1,
        this._sourceLog
      );
      this._used = true;
    }
  }

  autoDiscard() {}
}
