import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";

export class Sabre extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "sabre", "szabla", false, "", Infinity);
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    this.addToResources();
  }

  use(target): void {
    //todo: implement
  }
}
