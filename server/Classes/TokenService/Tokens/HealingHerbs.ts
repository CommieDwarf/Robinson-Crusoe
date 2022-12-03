import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";

export class HealingHerbs extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(
      game,
      character,
      "healingHerbs",
      "jeśli zbudowałeś Naczynia, otrzymujesz +1 do morali"
    );
  }

  use() {
    if (this._game.inventionsService.getInvention("pot").isBuilt) {
      this._game.morale.lvlUp(1, this._sourceLog);
      this.discard();
    }
  }

  autoDiscard() {}
}
