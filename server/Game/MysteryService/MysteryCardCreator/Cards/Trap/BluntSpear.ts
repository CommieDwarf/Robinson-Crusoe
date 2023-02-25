import { TrapMysteryCard } from "./TrapMysteryCard/TrapMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class BluntSpear extends TrapMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "blunt spear", "stara dzida");
  }

  triggerDrawEffect(drawer: ICharacter) {
    this._game.characterService.hurt(drawer, 2, this._namePL);
  }
}
