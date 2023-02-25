import { MysteryCard } from "../MysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/PlayerCharacter";
import { CreatureMysteryCard } from "./CreatureMysteryCard/CreatureMysteryCard";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Bats extends CreatureMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "bats", "nietoperze", false, "");
  }

  triggerDrawEffect(drawer: ICharacter) {
    this._game.characterService.decrDetermination(drawer, 1, this._namePL);
  }
}
