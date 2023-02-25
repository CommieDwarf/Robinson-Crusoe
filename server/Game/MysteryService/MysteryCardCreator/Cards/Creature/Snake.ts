import { CreatureMysteryCard } from "./CreatureMysteryCard/CreatureMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Snake extends CreatureMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "snake", "wąż", false, "");
  }

  triggerDrawEffect(drawer: ICharacter) {
    this._game.characterService.hurt(drawer, 2, this._namePL);
  }
}
