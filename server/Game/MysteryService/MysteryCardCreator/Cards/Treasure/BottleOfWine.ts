import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { ITreasureMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class BottleOfWine
  extends TreasureMysteryCard
  implements ITreasureMysteryCard
{
  constructor(game: IGame) {
    super(game, "bottle of wine", "butelka wina", false, "", 1);
  }

  use(target: ICharacter | null) {
    super.use(target);
    if (!target) {
      throw new Error(
        "target must be specified with this treasure: " + this._name
      );
    }
    this._game.characterService.heal(target, 2, this._namePL);
  }
}
