import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";

export class Herbs extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(
      game,
      character,
      "herbs",
      "Jeśli zbudowałeś Naczynia, budujesz Lek bez poświecania akcji"
    );
  }

  use() {
    if (this._game.inventionsService.getInvention("pot").isBuilt) {
      this._game.inventionsService.build("medicine", this._character);
      this.discard();
    }
  }

  autoDiscard() {}
}
