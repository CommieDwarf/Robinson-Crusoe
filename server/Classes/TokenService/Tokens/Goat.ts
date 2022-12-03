import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";

export class Goat extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(
      game,
      character,
      "goat",
      "Jeśli posiadasz conajmniej 1 poziom broni, otrzymujesz 1 jedzenie i 1 skórę."
    );
  }

  use() {
    if (this._game.structuresService.getStruct("weapon").lvl > 0) {
      this._game.allResources.addResourceToOwned("leather", 1, this._sourceLog);
      this._game.allResources.addResourceToOwned("food", 1, this._sourceLog);
      this.discard();
    }
  }

  autoDiscard() {}
}
