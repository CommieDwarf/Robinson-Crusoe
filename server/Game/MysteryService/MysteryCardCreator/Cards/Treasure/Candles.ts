import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";

export class Candles extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "candles", "świeczki", false, "", 0);
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    this.addToResources();
  }
}
