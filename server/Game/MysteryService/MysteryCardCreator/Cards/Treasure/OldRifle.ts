import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { ITreasureMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class OldRifle
  extends TreasureMysteryCard
  implements ITreasureMysteryCard
{
  constructor(game: IGame) {
    super(game, "old rifle", "stara strzelba", false, "", 1);
  }

  use(user: ICharacter | null) {
    if (user) {
      super.use(user);
      //TODO: implement temporal weapon boost
    }
  }
}
