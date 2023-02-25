import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {ITreasureMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";

export class OldClothes
    extends TreasureMysteryCard
    implements ITreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "old clothes", "komplet starych ubrań", false, "", Infinity);
  }

  use() {
    //TODO implement
  }
}
