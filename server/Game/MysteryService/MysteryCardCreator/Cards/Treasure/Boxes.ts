import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/PlayerCharacter";

export class Boxes extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "boxes", "skrzynie", false, "", 0);
  }


  triggerDrawEffect(drawer: IPlayerCharacter) {
    this.addToResources();
  }
}
