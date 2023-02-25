import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { ITreasureMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class AntiqueRapier
  extends TreasureMysteryCard
  implements ITreasureMysteryCard
{
  constructor(game: IGame) {
    super(game, "antique rapier", "zabytkowy rapier", false, "", 1);
  }

  use(target: ICharacter | null) {
    super.use(target);
    this._game.constructionService.lvlUpConstruction(
      CONSTRUCTION.WEAPON,
      2,
      this._namePL
    );
  }
}
