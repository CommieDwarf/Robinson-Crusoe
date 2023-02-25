import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {ITreasureMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";

export class Helmet
    extends TreasureMysteryCard
    implements ITreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "helmet", "hełm", false, "", Infinity);
  }

  use() {
    //TODO: implement
  }
}
