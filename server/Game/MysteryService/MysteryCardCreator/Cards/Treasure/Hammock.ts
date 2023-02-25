import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {ITreasureMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";

export class Hammock
    extends TreasureMysteryCard
    implements ITreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "hammock", "hamak", false, "", Infinity);
  }

  use() {
    //TODO: implement
  }
}
