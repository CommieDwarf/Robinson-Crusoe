import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { ITreasureMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Boxes extends TreasureMysteryCard implements ITreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "boxes", "skrzynie", false, "", 0);
  }

  use(target: ICharacter | null) {
    //left this empty for now.
    //this treasure grands passive effect.
  }
}
