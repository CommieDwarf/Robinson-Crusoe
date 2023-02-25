import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {ITreasureMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";

export class Hatched
    extends TreasureMysteryCard
    implements ITreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "hatched", "siekiera", false, "", 1);
  }

  use() {
    //TODO: implement
  }

}
