import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/PlayerCharacter";

export class AntiqueRapier extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "antique rapier", "zabytkowy rapier", false, "", 0);
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    this._game.constructionService.lvlUpConstruction(
      CONSTRUCTION.WEAPON,
      2,
      this._namePL
    );
  }
}
