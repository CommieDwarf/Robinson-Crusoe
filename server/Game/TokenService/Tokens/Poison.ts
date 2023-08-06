import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { DISCOVERY_TOKEN } from "../../../../interfaces/TokenService/Token";
import { INVENTION_STARTER } from "../../../../interfaces/InventionService/Invention";
import { CONSTRUCTION } from "../../../../interfaces/ConstructionService/Construction";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";
import { IPlayerCharacter } from "../../../../interfaces/Characters/Character";

export class Poison extends Token {
  constructor(game: IGame) {
    super(
      game,
      DISCOVERY_TOKEN.POISON,
      "Jeśli masz zbudowane Naczynia, otrzymujesz +2 do broni"
    );
  }

  use(user: IPlayerCharacter, target: IPlayerCharacter | null = null) {
    if (
      this._game.inventionService.getInvention(INVENTION_STARTER.POT).isBuilt
    ) {
      super.use(user);
      this._game.constructionService.lvlUpConstruction(
        CONSTRUCTION.WEAPON,
        2,
        this._sourceLog
      );
      this._used = true;
    }
  }

  autoDiscard() {}
}
