import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class HerbalMixture extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "herbal mixture", "ziołowa mikstura", false, "", 1);
  }

  triggerDrawEffect(drawer: ICharacter) {
    this.addToResources();
  }

  use() {
    //TODO: implement
  }
}
