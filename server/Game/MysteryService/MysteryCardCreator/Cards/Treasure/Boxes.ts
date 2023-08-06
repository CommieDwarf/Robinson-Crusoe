import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";

export class Boxes extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "boxes", "skrzynie", false, "", 0);
  }

  //
  // use(target): void {
  //   //left this empty for now.
  //   //this treasure grands passive effect.
  // }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    this.addCardAsReminder();
  }
}
