import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { ITreasureMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class CeremonialBowl
  extends TreasureMysteryCard
  implements ITreasureMysteryCard
{
  constructor(game: IGame) {
    super(
      game,
      "ceremonial bowl",
      "ceremonialna czara",
      true,
      "klątwa pokonana!",
      0
    );
  }

  triggerDrawEffect(drawer: ICharacter) {
    //TODO: implement reroll token on drawer.
  }

  triggerEventEffect() {
    //TODO: implement delete reroll token on drawer.
  }
}
