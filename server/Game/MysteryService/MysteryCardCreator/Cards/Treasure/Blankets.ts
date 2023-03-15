import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Blankets extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "blankets", "koce", false, "", 3);
  }

  //
  // use(target): void {
  //   super.use(target);
  //   //TODO: implement
  // }

  triggerDrawEffect(drawer: ICharacter) {
    this.addToResources();
  }
}
