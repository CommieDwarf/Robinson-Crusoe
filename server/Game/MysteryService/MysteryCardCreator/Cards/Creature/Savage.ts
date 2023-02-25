import { CreatureMysteryCard } from "./CreatureMysteryCard/CreatureMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class Savage extends CreatureMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "savage", "dzikus", true, "nieudane polowanie");
  }

  triggerDrawEffect(drawer: ICharacter) {
    const weapon = this._game.constructionService.getConstruction(
      CONSTRUCTION.WEAPON
    );
    if (weapon.lvl > 0) {
      this._game.constructionService.lvlDownConstruction(
        CONSTRUCTION.WEAPON,
        weapon.lvl,
        this._namePL
      );
    }
  }

  triggerEventEffect() {
    //TODO:  implement draw mystery card
  }
}
