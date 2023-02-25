import { TrapMysteryCard } from "./TrapMysteryCard/TrapMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class HiddenRope extends TrapMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "hidden rope", "ukryta lina");
  }

  triggerDrawEffect(drawer: ICharacter) {
    this._game.constructionService.lvlDownIfPossible(
      CONSTRUCTION.WEAPON,
      2,
      this._namePL
    );
  }
}
