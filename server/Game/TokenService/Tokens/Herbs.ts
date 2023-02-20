import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { INVENTION_STARTER } from "../../../../interfaces/InventionService/Invention";
import { ICharacter } from "../../../../interfaces/Characters/Character";
import { DISCOVERY_TOKEN } from "../../../../interfaces/TokenService/Token";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";

export class Herbs extends Token {
  constructor(game: IGame) {
    super(
      game,
      DISCOVERY_TOKEN.HERBS,
      "Jeśli zbudowałeś Naczynia, budujesz Lek bez poświęcania akcji"
    );
  }

  use(user: IPlayerCharacter, target: ICharacter | null = null) {
    if (
      this._game.inventionService.getInvention(INVENTION_STARTER.POT).isBuilt
    ) {
      this._used = true;
      super.use(user);
      this._game.inventionService.build(INVENTION_STARTER.MEDICINE, user);
    }
  }

  autoDiscard() {}
}
