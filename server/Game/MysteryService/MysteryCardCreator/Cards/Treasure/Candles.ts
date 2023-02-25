import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { ITreasureMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Candles
  extends TreasureMysteryCard
  implements ITreasureMysteryCard
{
  constructor(game: IGame) {
    super(game, "candles", "świeczki", false, "", 1);
  }

  use(target: ICharacter | null) {
    super.use(target);
    //TODO: implement helper pawns
  }
}
