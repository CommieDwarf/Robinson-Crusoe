import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";

export class NourishingLarvae extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(
      game,
      character,
      "nourishingLarvae",
      "Otrzymujesz 2 do jedzenia do posiadanych surowców." +
        " Żeton jest automatycznie realizowany po fazie akcji."
    );
  }

  use() {
    this._game.allResources.addResourceToOwned("food", 2, this._sourceLog);
    this.discard();
  }

  autoDiscard() {
    if (this._game.phaseService.phase === "weather") {
      this._game.allResources.addResourceToOwned("food", 2, this._sourceLog);
      this.discard();
    }
  }
}
