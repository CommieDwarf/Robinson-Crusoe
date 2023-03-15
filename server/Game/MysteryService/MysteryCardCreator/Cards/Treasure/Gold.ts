import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Gold extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "gold", "złoto!", false, "", 0);
  }

  triggerDrawEffect(drawer: ICharacter) {
    this.addCardAsReminder();
  }
}
