import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Hammock extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "hammock", "hamak", false, "", 0);
  }

  triggerDrawEffect(drawer: ICharacter) {
    this.addCardAsReminder();
  }
}
