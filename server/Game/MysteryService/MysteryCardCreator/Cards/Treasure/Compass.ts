import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";

export class Compass extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "compass", "kompas", false, "", 0);
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    this.addToResources();
  }
}
