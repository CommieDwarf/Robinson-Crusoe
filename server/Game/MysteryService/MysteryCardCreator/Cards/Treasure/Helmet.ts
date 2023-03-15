import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Helmet extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "helmet", "hełm", false, "", 0);
  }

  triggerDrawEffect(drawer: ICharacter) {
    this.addCardAsReminder();
  }
}
