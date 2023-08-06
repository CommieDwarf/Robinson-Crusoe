import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";
import { INVENTION_STARTER } from "../../../../../../interfaces/InventionService/Invention";

export class Crocks extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "crocks", "gliniane naczynia", false, "", 0);
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    if (!this._game.inventionService.isBuilt(INVENTION_STARTER.POT)) {
      this._game.inventionService.build(INVENTION_STARTER.POT, drawer);
    }
  }
}
