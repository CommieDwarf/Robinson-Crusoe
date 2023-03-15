import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class CaveWithFurs extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "cave with furs", "grota ze skórami", false, "", 1);
  }

  triggerDrawEffect(drawer: ICharacter) {
    this._game.resourceService.addBasicResourceToFuture(
      "leather",
      2,
      this._namePL
    );
  }
}
