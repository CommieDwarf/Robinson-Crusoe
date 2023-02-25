import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { ITreasureMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Ropes extends TreasureMysteryCard implements ITreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "ropes", "liny", false, "", 0);
  }

  triggerDrawEffect(drawer: ICharacter) {
    //TODO: implement
  }
}
