import { CreatureMysteryCard } from "./CreatureMysteryCard/CreatureMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";
import { INVENTION_STARTER } from "../../../../../../interfaces/InventionService/Invention";

export class Scorpion extends CreatureMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "scorpion", "skorpion", false, "");
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    if (!this._game.inventionService.isBuilt(INVENTION_STARTER.MEDICINE)) {
      this._game.characterService.hurt(drawer, 3, this._namePL);
    }
  }
}
