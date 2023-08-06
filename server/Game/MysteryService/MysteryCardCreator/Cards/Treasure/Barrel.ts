import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";

export class Barrel extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "barrel", "beczka", false, "", 1);
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    this.addToResources();
  }

  // use(target): void {
  //   super.use(target);
  //   //TODO: implement
  // }
}
