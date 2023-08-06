import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";

export class OldRifle extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "old rifle", "stara strzelba", false, "", 1);
  }

  use(target): void {
    if (target) {
      super.use(target);
      //TODO: implement temporal weapon boost
    }
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    this.addToResources();
  }
}
