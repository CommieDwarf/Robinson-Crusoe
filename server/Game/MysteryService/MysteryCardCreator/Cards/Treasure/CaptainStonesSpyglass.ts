import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { ITreasureMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class CaptainStonesSpyglass
  extends TreasureMysteryCard
  implements ITreasureMysteryCard
{
  constructor(game: IGame) {
    super(
      game,
      "captain stones spyglass",
      "luneta kapitana Stone'a",
      false,
      "",
      1
    );
  }

  use(target: ICharacter | null) {
    super.use(target);
    //TODO: reveal 3 tiles and place them on top of stack in preferred order.
  }
}
