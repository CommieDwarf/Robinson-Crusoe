import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";

export class Ropes extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "ropes", "liny", false, "", 0);
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    //TODO: implement
  }
}
