import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { ITreasureMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class CaveWithFurs
  extends TreasureMysteryCard
  implements ITreasureMysteryCard
{
  constructor(game: IGame) {
    super(game, "cave with furs", "grota ze skórami", false, "", 1);
  }

  use(target: ICharacter | null) {
    super.use(target);
    this._game.resourceService.addResourceToOwned("leather", 2, this._namePL);
  }
}
