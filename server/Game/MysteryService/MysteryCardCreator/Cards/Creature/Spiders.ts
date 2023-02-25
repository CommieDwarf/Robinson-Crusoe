import { CreatureMysteryCard } from "./CreatureMysteryCard/CreatureMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Spiders extends CreatureMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "spiders", "pająki", false, "");
  }

  triggerDrawEffect(drawer: ICharacter) {
    this._game.characterService.decrDetermination(drawer, 2, this._namePL);
  }
}
