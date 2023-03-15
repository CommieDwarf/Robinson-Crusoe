import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class ProtectiveAmulet extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "protective amulet", "amulet ochronny", false, "", 1);
  }

  triggerDrawEffect(drawer: ICharacter) {
    this.addToResources();
  }

  use(target): void {
    //todo: implement
  }
}
