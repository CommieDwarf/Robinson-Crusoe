import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { INVENTION_STARTER } from "../../../../interfaces/InventionService/Invention";
import { DISCOVERY_TOKEN } from "../../../../interfaces/TokenService/Token";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";
import { ICharacter } from "../../../../interfaces/Characters/Character";

export class HealingHerbs extends Token {
  constructor(game: IGame) {
    super(
      game,
      DISCOVERY_TOKEN.HEALING_HERBS,
      "jeśli zbudowałeś Naczynia, otrzymujesz +1 do morali"
    );
  }

  use(user: IPlayerCharacter, target: ICharacter | null = null) {
    if (
      this._game.inventionService.getInvention(INVENTION_STARTER.POT).isBuilt
    ) {
      this._game.moraleService.lvlUp(1, this._sourceLog);
      this._used = true;
      super.use(user);
    }
  }

  autoDiscard() {}
}
