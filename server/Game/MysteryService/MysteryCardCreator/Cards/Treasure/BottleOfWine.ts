import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/PlayerCharacter";

export class BottleOfWine extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "bottle of wine", "butelka wina", false, "", 1);
  }

  use(): void {
    super.use();
    this._game.characterService.heal(this._game.localPlayer.getCharacter(), 2, this._namePL);
    this.removeFromOwnedResources();
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    this.addToResources();
  }
}
