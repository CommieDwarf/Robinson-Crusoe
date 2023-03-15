import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { CONSTRUCTION } from "../../../../interfaces/ConstructionService/Construction";
import { DISCOVERY_TOKEN } from "../../../../interfaces/TokenService/Token";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";
import { ICharacter } from "../../../../interfaces/Characters/Character";

export class Goat extends Token {
  constructor(game: IGame) {
    super(
      game,
      DISCOVERY_TOKEN.GOAT,
      "Jeśli posiadasz conajmniej 1 poziom broni, otrzymujesz 1 jedzenie i 1 skórę."
    );
  }

  use(user: IPlayerCharacter, target: ICharacter | null = null) {
    if (
      this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON).lvl >
      0
    ) {
      this._game.resourceService.addBasicResourceToOwned(
        "leather",
        1,
        this._sourceLog
      );
      this._game.resourceService.addBasicResourceToOwned(
        "food",
        1,
        this._sourceLog
      );
      this._used = true;
      super.use(user);
    }
  }

  autoDiscard() {}
}
